import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Calendar, X, BookOpen, Flame, Target } from 'lucide-react';
import { getTodayStr, isCompletedOnDate, calculatePeriodProgress, calculateStats, isTaskDueToday } from '@/lib/utils';
import Avatar from './Avatar';
import HabitDay from './HabitDay';

// Minimum horizontal travel (in px) to count as a week swipe. Below this
// threshold we ignore the gesture so light scrolling / tapping doesn't shift
// the week by accident.
const SWIPE_THRESHOLD = 45;

const WEEK_DAY_LABELS = ['一', '二', '三', '四', '五', '六', '日']; // Mon..Sun

// Build a 7-cell array describing the calendar week (Mon..Sun) that contains
// `anchorDate`. Used by the interactive week strip on the daily view — anchor
// advances ±7 days when the user taps prev/next week.
const computeWeek = (anchorDate) => {
    // JS getDay: Sun=0, Mon=1, ..., Sat=6. We display Mon..Sun, so map the
    // anchor to its index in our display order: Mon→0, Tue→1, ..., Sun→6.
    const jsDay = anchorDate.getDay();
    const mondayOffset = (jsDay + 6) % 7;
    const monday = new Date(anchorDate);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(anchorDate.getDate() - mondayOffset);

    const todayStr = getTodayStr();
    return WEEK_DAY_LABELS.map((label, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        return {
            label,
            dateStr,
            dayNum: d.getDate(),
            month: d.getMonth() + 1,
            isToday: dateStr === todayStr,
        };
    });
};

const AppHeader = ({
    onViewChange,
    currentView,
    onOpenAddFlow,
    onOpenBadges,
    onOpenExplore,
    user,
    onOpenProfile,
    className,
    // Date navigation — pass from MainApp so daily view can browse past/future
    selectedDate,
    onSelectDate,
    tasks = [],
}) => {
    // Week anchor — any date inside the displayed week. Initialized from
    // selectedDate (fallback today) so the strip opens on the week the user
    // is actually viewing.
    const [weekAnchor, setWeekAnchor] = useState(() => {
        const seed = selectedDate ? new Date(selectedDate) : new Date();
        return isNaN(seed.getTime()) ? new Date() : seed;
    });

    // Keep the strip in sync if the parent jumps selectedDate outside the
    // currently displayed week (e.g. the "+" flow resets selectedDate to today).
    useEffect(() => {
        if (!selectedDate) return;
        const d = new Date(selectedDate);
        if (isNaN(d.getTime())) return;
        const cells = computeWeek(weekAnchor);
        const inRange = cells.some(c => c.dateStr === selectedDate);
        if (!inRange) setWeekAnchor(d);
    }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

    const weekCells = useMemo(() => computeWeek(weekAnchor), [weekAnchor]);

    // Helper to check if all tasks for a date are completed
    const isDateFullyComplete = (dateStr) => {
        if (!tasks.length) return false;
        const tasksForDate = tasks.filter(t => isTaskDueToday(t, dateStr) && (!t.status || t.status === 'active'));
        if (tasksForDate.length === 0) return false;
        return tasksForDate.every(t => isCompletedOnDate(t, dateStr));
    };

    const shiftWeek = (deltaDays) => {
        const d = new Date(weekAnchor);
        d.setDate(d.getDate() + deltaDays);
        setWeekAnchor(d);
    };

    // Swipe handling — horizontal swipe ≥ SWIPE_THRESHOLD shifts ±7 days.
    // `swipedRef` is checked in the cell onClick handler so a long horizontal
    // drag doesn't accidentally tap a day cell when it ends.
    const touchOrigin = useRef(null);
    const swipedRef = useRef(false);
    const handleTouchStart = (e) => {
        const t = e.touches[0];
        touchOrigin.current = { x: t.clientX, y: t.clientY };
        swipedRef.current = false;
    };
    const handleTouchMove = (e) => {
        const origin = touchOrigin.current;
        if (!origin) return;
        const t = e.touches[0];
        const dx = t.clientX - origin.x;
        const dy = t.clientY - origin.y;
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
            swipedRef.current = true;
        }
    };
    const handleTouchEnd = (e) => {
        const origin = touchOrigin.current;
        if (!origin) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - origin.x;
        const dy = t.clientY - origin.y;
        touchOrigin.current = null;
        if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
            // Swipe left → next week; swipe right → previous week
            shiftWeek(dx < 0 ? 7 : -7);
        }
        // Keep swipedRef true until after the synthetic click fires so the
        // cell button bails out; reset on next tick.
        setTimeout(() => { swipedRef.current = false; }, 0);
    };

    const todayStr = getTodayStr();

    // Calculate streaks and weekly stats
    const overallStreak = useMemo(() => {
        if (!tasks.length) return 0;
        // Find the maximum streak among all tasks
        let maxStreak = 0;
        tasks.forEach(task => {
            if (task.history) {
                const { streak } = calculateStats(task);
                maxStreak = Math.max(maxStreak, streak);
            }
        });
        return maxStreak;
    }, [tasks]);

    const weeklyGoalProgress = useMemo(() => {
        const periodTasks = tasks.filter(t => t.recurrence?.mode === 'period_count' && t.frequency === 'weekly');
        const completed = periodTasks.filter(t => calculatePeriodProgress(t) >= t.recurrence.periodTarget).length;
        return { completed, total: periodTasks.length };
    }, [tasks]);

    const headerDateLabel = useMemo(() => {
        if (!selectedDate) return '';
        const d = new Date(selectedDate);
        if (isNaN(d.getTime())) return '';
        const m = d.getMonth() + 1;
        const day = d.getDate();
        const wd = WEEK_DAY_LABELS[(d.getDay() + 6) % 7];
        return `${m}/${day} (${wd})`;
    }, [selectedDate]);

    const greeting = (() => {
        const h = new Date().getHours();
        if (h >= 5 && h < 12) return '早安';
        if (h < 18) return '午安';
        return '晚安';
    })();

    return (
        <div className={`bg-white sticky top-0 z-30 border-b border-[#D1D4D9] ${className || ''}`}>
            {currentView === 'daily' ? (
                <div className="px-4 pt-5 pb-4">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">{greeting}</p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onViewChange('dashboard_detail')}
                                className="hover:opacity-70 active:opacity-50 transition-opacity"
                                aria-label="打開日曆"
                            >
                                <Calendar size={20} className="text-[#6B7280]" />
                            </button>
                            <button
                                onClick={onOpenProfile || (() => onViewChange('daily'))}
                                className="hover:opacity-70 active:opacity-50 transition-opacity"
                                aria-label="開啟個人資料"
                            >
                                <Avatar user={user} size="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-[#1A1A1A] mb-3">{user?.nickname || '訪客'}</p>

                    {/* Streak and Weekly Goals Stats */}
                    <div className="flex gap-2">
                        {overallStreak > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] rounded-full">
                                <Flame size={14} className="text-[#F59E0B]" />
                                <span className="text-xs font-semibold text-[#92400E]">{overallStreak} 天連續</span>
                            </div>
                        )}
                        {weeklyGoalProgress.total > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DBEAFE] rounded-full">
                                <Target size={14} className="text-[#3B82F6]" />
                                <span className="text-xs font-semibold text-[#1E40AF]">{weeklyGoalProgress.completed}/{weeklyGoalProgress.total} 本週</span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={onOpenProfile || (() => onViewChange('daily'))}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
                        aria-label="開啟個人資料"
                    >
                        <Avatar user={user} size="w-8 h-8" />
                        <span className="font-medium text-[#374151] text-sm max-w-[100px] truncate">{user?.nickname || '訪客'}</span>
                    </button>
                    <span className="font-bold text-[#004F51] text-sm">
                        {currentView === 'manage' ? '計畫總覽'
                            : currentView === 'dashboard_detail' ? '洞察報告'
                            : currentView === 'stats' ? '統計'
                            : '成就中心'}
                    </span>
                    <div className="flex gap-1">
                        {currentView === 'dashboard_detail' && (
                            <button onClick={() => onViewChange('daily')} className="w-8 h-8 bg-[#F2F2F2] text-[#374151] rounded-lg flex items-center justify-center hover:bg-[#D1D4D9] transition-colors duration-200">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Interactive Week Strip with HabitDay — tap any day to view its tasks; swipe
                left/right on the strip to shift the displayed week ±7 days.
                When the strip is showing a non-current week, a tiny "今"
                badge appears in the top-right corner to jump back. Today is
                marked with a green circle. */}
            {currentView === 'daily' && (
                <div
                    className="relative flex items-center justify-center px-2 md:px-6 py-3 gap-2 touch-pan-y select-none bg-white border-b border-gray-100 overflow-x-auto no-scrollbar"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {weekCells.map((cell) => {
                        const isSelected = selectedDate === cell.dateStr;
                        const isFullyComplete = isDateFullyComplete(cell.dateStr);
                        return (
                            <button
                                type="button"
                                key={cell.dateStr}
                                onClick={() => {
                                    if (swipedRef.current) return;
                                    onSelectDate?.(cell.dateStr);
                                }}
                                className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-95 relative"
                            >
                                <span className="text-[10px] font-medium text-gray-500 leading-none">{cell.label}</span>
                                <div className="scale-75 origin-top">
                                    <HabitDay
                                        status={isSelected ? 'inProgress' : isFullyComplete ? 'done' : 'unstarted'}
                                        dateStr={cell.dateStr}
                                        progress={isSelected ? 0.5 : 0}
                                    />
                                </div>
                                {isSelected && <div className="absolute bottom-0 w-full h-[3px] bg-[#169E6B] rounded-t-full" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AppHeader;
