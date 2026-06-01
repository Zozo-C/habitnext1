"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Award } from 'lucide-react';
import AppHeader from './AppHeader';
import SidebarNavigation from './SidebarNavigation';
import RecommendationCardRow from './RecommendationCardRow';
import FocusMapBanner from './FocusMapBanner';
import DailyTasksSection from './DailyTasksSection';
import ManageView from './ManageView';
import DashboardSummaryCard from './DashboardSummaryCard';
import HabitCalendar from './HabitCalendar';
import TaskFormModal from './TaskFormModal';
import TaskLibraryModal from './TaskLibraryModal';
import TaskDetailModal from './TaskDetailModal';
import LoginModal from './LoginModal';
import TemplateExplorer from './TemplateExplorer';
import ProfileModal from './ProfileModal';
import FocusMapModal from './FocusMapModal';
import AspirationPicker from './AspirationPicker';
import AspirationRecommendationPanel from './AspirationRecommendationPanel';
import UndoToast from './UndoToast';
import BottomTabBar from './BottomTabBar';
import StreakCelebration from './StreakCelebration';
import OnboardingFlow from './Onboarding/OnboardingFlow';
import { useTaskManagement } from '@/hooks/useTaskManagement';
import { generateId, getTodayStr, isTaskDueToday, isCompletedOnDate, calculateStats } from '@/lib/utils';
import { cueOrderFor } from '@/lib/anchors';
import { SLEEP_TYPE_PROFILES } from '@/lib/sleepTypeKeys';
import { domainToIconKey } from '@/lib/constants';

const StatsView = dynamic(() => import('./StatsView'), {
    ssr: false,
    loading: () => <div className="p-4 text-center text-gray-400 py-12">載入中…</div>,
});

const MainApp = () => {
    const [user, setUser] = useState(null);
    const [currentView, setCurrentView] = useState('daily');
    const [selectedDate, setSelectedDate] = useState(getTodayStr());
    const [editingTask, setEditingTask] = useState(null);
    const [viewingTask, setViewingTask] = useState(null);

    // Modal visibility
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
    const [isTemplateExplorerOpen, setIsTemplateExplorerOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isFocusMapModalOpen, setIsFocusMapModalOpen] = useState(false);
    const [isAspirationPickerOpen, setIsAspirationPickerOpen] = useState(false);

    // UI state
    const [recDismissed, setRecDismissed] = useState(false);
    const [bannerDismissed, setBannerDismissed] = useState(false);
    const [completedExpanded, setCompletedExpanded] = useState(false);

    // Aspiration flow (Slice K)
    const [activeAspiration, setActiveAspiration] = useState(null);
    const [initialTemplateForExplorer, setInitialTemplateForExplorer] = useState(null);
    const [aspirationHabitForLibrary, setAspirationHabitForLibrary] = useState(null);

    // Onboarding and celebration states
    const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('onboarding_completed') === 'true';
        }
        return false;
    });
    const [showStreakCelebration, setShowStreakCelebration] = useState(false);
    const [todayFirstTaskCompleted, setTodayFirstTaskCompleted] = useState(false);

    const onViewingTaskUpdated = (taskId, updatedTask) => {
        if (viewingTask?.id === taskId) setViewingTask(updatedTask);
    };

    const handleOnboardingComplete = () => {
        setOnboardingCompleted(true);
        localStorage.setItem('onboarding_completed', 'true');
    };

    const {
        tasks, setTasks, formatTasks,
        assignments, setAssignments,
        loading,
        exitingTaskIds,
        undoToast, setUndoToast,
        candidateCount, setCandidateCount,
        fetchTasks, fetchAssignments, fetchCandidateCount,
        handleUpdateProgress,
        clearExitTimersFor,
        scheduleCompletionExit,
    } = useTaskManagement(user, onViewingTaskUpdated);

    // Auth on load
    useEffect(() => {
        const stored = localStorage.getItem('habit_user');
        if (stored) {
            const u = JSON.parse(stored);
            setUser(u);
            // Ensure demo user exists in DB
            if (u.id === 'demo-user') {
                fetch('/api/auth/demo', { method: 'POST' }).catch(() => {});
            }
            fetchTasks(u.id);
            fetchAssignments(u.id);
            fetchCandidateCount(u.id);
        } else if (process.env.NODE_ENV === 'development') {
            const demoUser = { id: 'demo-user', nickname: '測試體驗家', phone: '0000000000', typeKey: 'daisy', sleepTypeKey: 'stress', isDemo: true };
            fetch('/api/auth/demo', { method: 'POST' }).then(() => {
                setUser(demoUser);
                localStorage.setItem('habit_user', JSON.stringify(demoUser));
                fetchTasks(demoUser.id);
                fetchAssignments(demoUser.id);
                fetchCandidateCount(demoUser.id);
            }).catch(() => {
                setIsLoginModalOpen(true);
            });
        } else {
            setIsLoginModalOpen(true);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('habit_user', JSON.stringify(userData));
        setIsLoginModalOpen(false);
        if (userData.tasks) {
            setTasks(formatTasks(userData.tasks));
            fetchAssignments(userData.id);
            fetchCandidateCount(userData.id);
        } else {
            fetchTasks(userData.id);
            fetchAssignments(userData.id);
            fetchCandidateCount(userData.id);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('habit_user');
        setUser(null);
        setIsLoginModalOpen(true);
    };

    const handleTaskUpdate = (task, action, value, subtaskId, dateStr) => {
        const date = dateStr || selectedDate;
        const wasCompleted = isCompletedOnDate(task, date);
        handleUpdateProgress(task, action, value, subtaskId, date);
        if (action !== 'toggle' || wasCompleted || date !== selectedDate) return;
        if (task.type === 'quantitative' || task.type === 'checklist') return;
        scheduleCompletionExit(task);
        setUndoToast({ taskId: task.id, date, message: `完成「${task.title}」` });

        // Trigger celebration on first task completion of today
        const isFirstTaskToday = !todayFirstTaskCompleted && !completedDailyTasks?.length;
        if (isFirstTaskToday) {
            setTodayFirstTaskCompleted(true);
            setShowStreakCelebration(true);
        }
    };

    const handleUndoCompletion = async () => {
        if (!undoToast) return;
        const { taskId } = undoToast;
        clearExitTimersFor(taskId);
        const t = tasks.find(x => x.id === taskId);
        if (t) await handleUpdateProgress(t, 'toggle', null, null, undoToast.date || selectedDate);
        setUndoToast(null);
    };

    const handleSaveTask = async (taskData) => {
        const sanitized = {
            ...taskData,
            dailyTarget: taskData.dailyTarget || 1,
            stepValue: taskData.stepValue || 1,
            unit: taskData.unit || '次',
            recurrence: { ...taskData.recurrence, periodTarget: taskData.recurrence?.periodTarget || 1 }
        };
        try {
            if (editingTask) {
                const res = await fetch(`/api/tasks/${editingTask.id}`, {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sanitized)
                });
                if (res.ok) {
                    const updated = await res.json();
                    const historyMap = {};
                    (updated.history || []).forEach(h => {
                        historyMap[h.date] = (updated.type === 'quantitative' || updated.recurrence?.mode === 'period_count') ? h.value : h.completed;
                    });
                    setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...updated, history: historyMap } : t));
                } else {
                    const err = await res.json();
                    alert(`儲存失敗: ${err.error || '未知錯誤'}`);
                }
            } else {
                const res = await fetch('/api/tasks', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...sanitized, userId: user.id })
                });
                if (res.ok) {
                    const created = await res.json();
                    if (created.status === 'candidate') {
                        setCandidateCount(c => c + 1);
                    } else {
                        setTasks(prev => [...prev, { ...created, history: {}, dailyProgress: {} }]);
                    }
                    if (activeAspiration?.id) {
                        fetch(`/api/aspirations/${activeAspiration.id}/habits`, {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ taskId: created.id }),
                        }).catch(e => console.warn('[MainApp] aspiration tag failed:', e));
                        setActiveAspiration(null);
                    }
                } else {
                    const err = await res.json();
                    alert(`建立失敗: ${err.error || '未知錯誤'}`);
                }
            }
        } catch (err) {
            alert('儲存失敗，請檢查網路連線');
        }
        setIsFormModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('確定要刪除此任務嗎？')) return;
        const prev = [...tasks];
        setTasks(t => t.filter(x => x.id !== taskId));
        setIsFormModalOpen(false);
        setEditingTask(null);
        try {
            await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
        } catch {
            setTasks(prev);
            alert('刪除失敗');
        }
    };

    const handleDeleteAssignment = async (id) => {
        try {
            const res = await fetch(`/api/user/assignments/${id}`, { method: 'DELETE' });
            if (res.ok) { fetchTasks(user.id); fetchAssignments(user.id); }
        } catch (e) { console.error('Delete assignment error:', e); }
    };

    const handleTemplateJoined = async (assignment) => {
        fetchTasks(user.id);
        fetchAssignments(user.id);
        if (activeAspiration?.id && assignment?.id) {
            try {
                const res = await fetch(`/api/tasks?userId=${user.id}`, { cache: 'no-store' });
                if (res.ok) {
                    const allTasks = await res.json();
                    await Promise.all(
                        allTasks.filter(t => t.assignmentId === assignment.id).map(t =>
                            fetch(`/api/aspirations/${activeAspiration.id}/habits`, {
                                method: 'POST', headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ taskId: t.id }),
                            }).catch(e => console.warn('[MainApp] tag fail', e))
                        )
                    );
                }
            } catch (e) { console.warn('[MainApp] template tag failed:', e); }
            setActiveAspiration(null);
        }
        setInitialTemplateForExplorer(null);
    };

    const handleAddHabitAsCandidate = async (habit, aspiration) => {
        if (!user?.id || !habit) return;
        const difficulties = habit.difficulties || {};
        const key = ['beginner', 'intermediate', 'challenge'].find(k => difficulties[k]?.enabled);
        const diff = key ? difficulties[key] : {};
        const payload = {
            userId: user.id, title: habit.name, details: habit.description || '',
            type: diff.type || 'binary', category: habit.icon || domainToIconKey(habit.category),
            frequency: diff.recurrence?.type || 'daily',
            recurrence: diff.recurrence || { type: 'daily', interval: 1, endType: 'never' },
            reminder: { enabled: false, offset: 0 },
            dailyTarget: diff.dailyTarget || 1, unit: diff.unit || '次',
            stepValue: diff.stepValue || 1, subtasks: diff.subtasks || [],
            officialHabitId: habit.id, status: 'candidate',
        };
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const created = await res.json();
            setCandidateCount(c => c + 1);
            if (aspiration?.id) {
                fetch(`/api/aspirations/${aspiration.id}/habits`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ taskId: created.id }),
                }).catch(e => console.warn('[MainApp] aspiration tag failed:', e));
            }
        } catch (e) {
            alert('加入候選失敗，請再試一次');
            throw e;
        }
    };

    // Derived state
    const todayStr = getTodayStr();
    const isSelectedToday = selectedDate === todayStr;
    const dailyTasks = tasks
        .filter(t => isTaskDueToday(t, selectedDate) && (!t.status || t.status === 'active'))
        .sort((a, b) => {
            const ac = isCompletedOnDate(a, selectedDate) ? 1 : 0;
            const bc = isCompletedOnDate(b, selectedDate) ? 1 : 0;
            if (ac !== bc) return ac - bc;
            const ao = cueOrderFor(a.cue), bo = cueOrderFor(b.cue);
            if (ao !== bo) return ao - bo;
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    const incompleteDailyTasks = dailyTasks.filter(t => !isCompletedOnDate(t, selectedDate));
    const completedDailyTasks = dailyTasks.filter(t => isCompletedOnDate(t, selectedDate));

    // Calculate overall streak for celebration
    const overallStreak = (() => {
        if (!tasks.length) return 0;
        let maxStreak = 0;
        tasks.forEach(task => {
            if (task.history) {
                const { streak } = calculateStats(task);
                maxStreak = Math.max(maxStreak, streak);
            }
        });
        return maxStreak;
    })();

    const flexibleTasks = tasks.filter(t => t.recurrence?.mode === 'period_count');
    const dailySectionLabel = (() => {
        if (isSelectedToday) return '今日行程';
        const d = new Date(selectedDate);
        if (isNaN(d.getTime())) return '行程';
        const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        if (selectedDate === tomorrow.toISOString().split('T')[0]) return '明日行程';
        if (selectedDate === yesterday.toISOString().split('T')[0]) return '昨日行程';
        return `${d.getMonth() + 1}/${d.getDate()} 行程`;
    })();
    const hasJoinedFlowerTemplate = user?.typeKey
        ? (assignments || []).some(a => a.status === 'active' && a.template?.category === user.typeKey)
        : false;
    const hasJoinedSleepTemplate = (() => {
        if (!user?.sleepTypeKey) return false;
        const target = SLEEP_TYPE_PROFILES[user.sleepTypeKey]?.categorySlug;
        return target ? (assignments || []).some(a => a.status === 'active' && a.template?.category === target) : false;
    })();
    const groupedTasks = assignments.map(a => ({ ...a, tasks: tasks.filter(t => t.assignmentId === a.id) }));
    const soloTasks = tasks.filter(t => !t.assignmentId);

    const openTaskDetail = (task) => { setViewingTask(task); setIsDetailModalOpen(true); };
    const handleTaskClick = (task) => {
        if (task.isLocked) { openTaskDetail(task); }
        else { setEditingTask(task); setIsFormModalOpen(true); }
    };

    if (loading && !user) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-emerald-600 font-bold">載入中...</div>
    );

    // Show onboarding if not completed
    if (user && !onboardingCompleted) {
        return <OnboardingFlow user={user} onComplete={handleOnboardingComplete} />;
    }

    return (
        <>
            <div className="min-h-screen w-full bg-[#F2F2F2] flex flex-col md:flex-row md:max-w-5xl md:mx-auto overflow-hidden md:shadow-xl md:rounded-xl md:my-8 md:border md:border-[#D1D4D9]">
                <AppHeader
                    onViewChange={setCurrentView} currentView={currentView}
                    onOpenAddFlow={() => { setIsLibraryModalOpen(true); setIsFormModalOpen(false); setEditingTask(null); setSelectedDate(getTodayStr()); }}
                    onOpenBadges={() => setCurrentView('badges')}
                    onOpenExplore={() => setIsTemplateExplorerOpen(true)}
                    user={user} onOpenProfile={() => setIsProfileModalOpen(true)}
                    selectedDate={selectedDate} onSelectDate={setSelectedDate}
                    tasks={tasks}
                    className="md:hidden"
                />
                <SidebarNavigation
                    user={user} currentView={currentView} onViewChange={setCurrentView}
                    onOpenTemplateExplorer={() => setIsTemplateExplorerOpen(true)}
                    onOpenFormModal={() => { setEditingTask(null); setIsFormModalOpen(true); }}
                    onOpenProfile={() => setIsProfileModalOpen(true)}
                />
                <main className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0 w-full">
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-28 md:pb-6 no-scrollbar">

                        {currentView === 'daily' && (
                            <div className="animate-fade-in-up">
                                {!recDismissed && (
                                    <RecommendationCardRow
                                        onOpenTemplateExplorer={() => setIsTemplateExplorerOpen(true)}
                                        onDismiss={() => setRecDismissed(true)}
                                    />
                                )}
                                {isSelectedToday && candidateCount >= 5 && !bannerDismissed && (
                                    <FocusMapBanner
                                        candidateCount={candidateCount}
                                        onDismiss={() => setBannerDismissed(true)}
                                        onOpenFocusMap={() => setIsFocusMapModalOpen(true)}
                                    />
                                )}
                                {isSelectedToday && (
                                    <DashboardSummaryCard tasks={tasks} onOpenDetail={() => setCurrentView('dashboard_detail')} />
                                )}
                                {!isSelectedToday && (
                                    <div className="mb-4 flex items-center justify-between gap-2 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3">
                                        <p className="text-xs text-indigo-700">正在預覽 <span className="font-bold">{dailySectionLabel}</span></p>
                                        <button
                                            type="button" onClick={() => setSelectedDate(todayStr)}
                                            className="text-xs font-bold px-3 py-1 rounded-full bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-100 active:bg-indigo-200 transition-colors"
                                        >回到今天</button>
                                    </div>
                                )}
                                <DailyTasksSection
                                    incompleteDailyTasks={incompleteDailyTasks}
                                    completedDailyTasks={completedDailyTasks}
                                    flexibleTasks={flexibleTasks}
                                    selectedDate={selectedDate} isSelectedToday={isSelectedToday}
                                    dailySectionLabel={dailySectionLabel}
                                    exitingTaskIds={exitingTaskIds}
                                    onTaskClick={openTaskDetail}
                                    onTaskUpdate={handleTaskUpdate}
                                    onUpdateProgress={handleUpdateProgress}
                                    onAfterAction={() => { if (user?.id) fetchTasks(user.id); }}
                                />
                            </div>
                        )}

                        {currentView === 'dashboard_detail' && (
                            <HabitCalendar tasks={tasks} onUpdate={handleUpdateProgress} onTaskClick={openTaskDetail} />
                        )}

                        {currentView === 'manage' && (
                            <ManageView
                                tasks={tasks} groupedTasks={groupedTasks} soloTasks={soloTasks} loading={loading}
                                onTaskClick={handleTaskClick} onTaskDelete={handleDeleteTask}
                                onDeleteAssignment={handleDeleteAssignment} onUpdateProgress={handleUpdateProgress}
                                onOpenTemplateExplorer={() => setIsTemplateExplorerOpen(true)}
                                onOpenFormModal={() => setIsFormModalOpen(true)}
                            />
                        )}

                        {currentView === 'stats' && (
                            <StatsView userId={user?.id} onBack={() => setCurrentView('daily')} />
                        )}

                        {currentView === 'badges' && (
                            <div className="p-4 text-center py-20">
                                <Award size={64} className="mx-auto text-yellow-400 mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800">成就中心</h2>
                                <p className="text-gray-500">持續完成任務，解鎖更多徽章！</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <TemplateExplorer
                isOpen={isTemplateExplorerOpen}
                onClose={() => { setIsTemplateExplorerOpen(false); setInitialTemplateForExplorer(null); if (activeAspiration) setActiveAspiration(null); }}
                userId={user?.id} onJoin={handleTemplateJoined}
                userTypeKey={user?.typeKey || null} userSleepTypeKey={user?.sleepTypeKey || null}
                initialTemplate={initialTemplateForExplorer}
            />
            <TaskFormModal
                isOpen={isFormModalOpen}
                onClose={() => { setIsFormModalOpen(false); setEditingTask(null); }}
                onSave={handleSaveTask} onDelete={handleDeleteTask}
                initialData={editingTask} defaultDate={selectedDate}
                yourTasks={tasks} userTypeKey={user?.typeKey || null}
            />
            <TaskDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => { setIsDetailModalOpen(false); setViewingTask(null); }}
                task={viewingTask} initialDate={selectedDate}
                onEdit={(task) => { setIsDetailModalOpen(false); setEditingTask(task); setIsFormModalOpen(true); }}
                onUpdate={handleUpdateProgress}
                onAfterAction={() => { if (user?.id) fetchTasks(user.id); }}
            />
            <TaskLibraryModal
                isOpen={isLibraryModalOpen}
                onClose={() => { setIsLibraryModalOpen(false); if (aspirationHabitForLibrary) setAspirationHabitForLibrary(null); if (activeAspiration) setActiveAspiration(null); }}
                onSelectTask={(task) => {
                    handleSaveTask({ ...task, id: generateId() });
                    if (aspirationHabitForLibrary) { setIsLibraryModalOpen(false); setAspirationHabitForLibrary(null); }
                }}
                onOpenCustomForm={() => { setIsLibraryModalOpen(false); setIsFormModalOpen(true); }}
                onOpenAspirationPicker={() => { setIsLibraryModalOpen(false); setActiveAspiration(null); setAspirationHabitForLibrary(null); setIsAspirationPickerOpen(true); }}
                yourTasks={tasks} userTypeKey={user?.typeKey || null} initialHabit={aspirationHabitForLibrary}
            />
            <LoginModal isOpen={isLoginModalOpen} onLogin={handleLogin} />
            <FocusMapModal
                isOpen={isFocusMapModalOpen} userId={user?.id}
                onClose={() => setIsFocusMapModalOpen(false)}
                onActivated={() => { setIsFocusMapModalOpen(false); setBannerDismissed(false); if (user?.id) { fetchTasks(user.id); fetchCandidateCount(user.id); } }}
            />
            <AspirationPicker
                isOpen={isAspirationPickerOpen && !activeAspiration}
                onClose={() => { setIsAspirationPickerOpen(false); setActiveAspiration(null); }}
                userId={user?.id} userTypeKey={user?.typeKey || null} userSleepTypeKey={user?.sleepTypeKey || null}
                onSelectAspiration={setActiveAspiration}
            />
            {isAspirationPickerOpen && activeAspiration && (
                <AspirationRecommendationPanel
                    aspiration={activeAspiration}
                    onBack={() => setActiveAspiration(null)}
                    onPickTemplate={(t) => { setIsAspirationPickerOpen(false); setInitialTemplateForExplorer(t); setIsTemplateExplorerOpen(true); }}
                    onPickHabit={(h) => { setIsAspirationPickerOpen(false); setAspirationHabitForLibrary(h); setIsLibraryModalOpen(true); }}
                    onAddHabitAsCandidate={handleAddHabitAsCandidate}
                    onOpenFocusMap={() => { setIsAspirationPickerOpen(false); setActiveAspiration(null); setIsFocusMapModalOpen(true); }}
                    onSkipToTemplates={() => { setIsAspirationPickerOpen(false); setActiveAspiration(null); setInitialTemplateForExplorer(null); setIsTemplateExplorerOpen(true); }}
                    onSkipToHabits={() => { setIsAspirationPickerOpen(false); setActiveAspiration(null); setIsLibraryModalOpen(true); }}
                />
            )}
            <ProfileModal
                isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}
                user={user} onLogout={() => { setIsProfileModalOpen(false); handleLogout(); }}
                onUpdate={(u) => { setUser(u); localStorage.setItem('habit_user', JSON.stringify(u)); }}
            />
            <UndoToast
                visible={!!undoToast} message={undoToast?.message || ''}
                onUndo={handleUndoCompletion} onDismiss={() => setUndoToast(null)}
            />
            <BottomTabBar
                currentView={currentView}
                onViewChange={setCurrentView}
                onOpenAddFlow={() => { setIsLibraryModalOpen(true); setEditingTask(null); setSelectedDate(getTodayStr()); }}
            />
            {showStreakCelebration && (
                <StreakCelebration
                    streak={overallStreak}
                    isVisible={showStreakCelebration}
                    onClose={() => setShowStreakCelebration(false)}
                />
            )}
        </>
    );
};

export default MainApp;
