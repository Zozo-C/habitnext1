"use client";
import { useState, useRef, useCallback, useEffect } from 'react';
import { getTodayStr } from '@/lib/utils';
import { visibleSubtasks, computeChecklistValue } from '@/lib/subtasks';

export function useTaskManagement(user, onViewingTaskUpdated) {
    const [tasks, setTasks] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exitingTaskIds, setExitingTaskIds] = useState(() => new Set());
    const [undoToast, setUndoToast] = useState(null);
    const [candidateCount, setCandidateCount] = useState(0);
    const exitTimersRef = useRef({});

    const formatTasks = (data) => data.map(t => {
        const historyMap = {};
        const dailyProgressMap = {};
        (t.history || []).forEach(h => {
            if (t.type === 'checklist') {
                historyMap[h.date] = { value: h.value, completed: h.completed, subtaskCompletions: h.subtaskCompletions || {} };
            } else {
                historyMap[h.date] = (t.type === 'quantitative' || t.recurrence?.mode === 'period_count') ? h.value : h.completed;
            }
            if (t.type === 'quantitative') dailyProgressMap[h.date] = { value: h.value, completed: h.completed };
        });
        return { ...t, history: historyMap, dailyProgress: dailyProgressMap };
    });

    const fetchTasks = useCallback(async (userId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tasks?userId=${userId}`);
            if (res.ok) setTasks(formatTasks(await res.json()));
        } catch (err) {
            console.error('Fetch tasks failed', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAssignments = useCallback(async (userId) => {
        try {
            const res = await fetch(`/api/user/assignments?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                setAssignments(data);
                return data;
            }
        } catch (err) {
            console.error('Fetch assignments failed', err);
        }
        return [];
    }, []);

    const fetchCandidateCount = useCallback(async (userId) => {
        try {
            const res = await fetch(`/api/tasks/candidates?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                setCandidateCount(Array.isArray(data) ? data.length : 0);
            }
        } catch (e) {
            console.error('Fetch candidate count error', e);
        }
    }, []);

    const clearExitTimersFor = useCallback((taskId) => {
        const t = exitTimersRef.current[taskId];
        if (!t) return;
        clearTimeout(t.collapseAt);
        clearTimeout(t.fetchAt);
        delete exitTimersRef.current[taskId];
    }, []);

    const scheduleCompletionExit = useCallback((task) => {
        clearExitTimersFor(task.id);
        const collapseAt = setTimeout(() => {
            setExitingTaskIds(prev => { const n = new Set(prev); n.add(task.id); return n; });
            const fetchAt = setTimeout(() => {
                if (user?.id) fetchTasks(user.id);
                setExitingTaskIds(prev => { const n = new Set(prev); n.delete(task.id); return n; });
                delete exitTimersRef.current[task.id];
            }, 300);
            exitTimersRef.current[task.id] = { collapseAt: null, fetchAt };
        }, 700);
        exitTimersRef.current[task.id] = { collapseAt, fetchAt: null };
    }, [clearExitTimersFor, user, fetchTasks]);

    const handleUpdateProgress = useCallback(async (task, action, value, subtaskId, dateStr = getTodayStr()) => {
        const prevTasks = tasks;
        let updatedTask = null;
        let historyUpdate = null;

        const newTasks = tasks.map(t => {
            if (t.id !== task.id) return t;

            if (action === 'toggle_subtask' && subtaskId) {
                const prevHist = t.history?.[dateStr] || {};
                const prevComp = prevHist.subtaskCompletions || {};
                const newComp = { ...prevComp, [subtaskId]: !prevComp[subtaskId] };
                const newValue = computeChecklistValue(newComp);
                const target = t.dailyTarget || visibleSubtasks(t, dateStr).length;
                updatedTask = { ...t, history: { ...t.history, [dateStr]: { ...prevHist, subtaskCompletions: newComp, value: newValue, completed: newValue >= target } } };
                historyUpdate = { taskId: t.id, date: dateStr, subtaskCompletions: newComp, value: newValue, completed: newValue >= target };
                return updatedTask;
            }

            if (task.recurrence?.mode === 'period_count' && action === 'period_add') {
                const cur = t.history[dateStr];
                const dailyLimit = t.recurrence.dailyLimit !== false;
                let newVal = dailyLimit ? true : Math.max(0, (typeof cur === 'number' ? cur : (cur ? 1 : 0)) + (value || 1)) || false;
                historyUpdate = { date: dateStr, completed: !!newVal, value: typeof newVal === 'number' ? newVal : (newVal ? 1 : 0) };
                updatedTask = { ...t, history: { ...t.history, [dateStr]: newVal } };
                return updatedTask;
            }

            if (t.type === 'quantitative') {
                const newVal = Math.max(0, (t.history[dateStr] || 0) + (value || 0));
                const completed = newVal >= t.dailyTarget;
                historyUpdate = { date: dateStr, completed, value: newVal };
                updatedTask = { ...t, history: { ...t.history, [dateStr]: newVal }, dailyProgress: { ...t.dailyProgress, [dateStr]: { value: newVal, completed } } };
                return updatedTask;
            }

            const newCompleted = !t.history?.[dateStr];
            historyUpdate = { date: dateStr, completed: newCompleted, value: newCompleted ? 1 : 0 };
            updatedTask = { ...t, completed: dateStr === getTodayStr() ? newCompleted : t.completed, history: { ...t.history, [dateStr]: newCompleted } };
            return updatedTask;
        });

        setTasks(newTasks);
        if (updatedTask) onViewingTaskUpdated?.(task.id, updatedTask);

        try {
            if (updatedTask) {
                await fetch(`/api/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...updatedTask, historyUpdate })
                });
            }
        } catch (err) {
            console.error('Update failed', err);
            setTasks(prevTasks);
        }
    }, [tasks, onViewingTaskUpdated]);

    useEffect(() => () => {
        Object.keys(exitTimersRef.current).forEach(clearExitTimersFor);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        tasks, setTasks, formatTasks,
        assignments, setAssignments,
        loading, setLoading,
        exitingTaskIds, setExitingTaskIds,
        undoToast, setUndoToast,
        candidateCount, setCandidateCount,
        fetchTasks, fetchAssignments, fetchCandidateCount,
        handleUpdateProgress,
        clearExitTimersFor,
        scheduleCompletionExit,
    };
}
