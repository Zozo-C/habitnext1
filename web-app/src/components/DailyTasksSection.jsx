"use client";
import { CalendarDays, Target, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import TaskCard from './TaskCard';
import HabitDay from './HabitDay';
import { getTodayStr } from '@/lib/utils';

// 計算周一到周日的日期陣列
const computeWeek = (anchorDate) => {
    const jsDay = anchorDate.getDay();
    const mondayOffset = (jsDay + 6) % 7;
    const monday = new Date(anchorDate);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(anchorDate.getDate() - mondayOffset);

    const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
    const todayStr = getTodayStr();

    return weekDays.map((label, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        return {
            label,
            dateStr,
            dayNum: d.getDate(),
            isToday: dateStr === todayStr,
        };
    });
};

const DailyTasksSection = ({
    incompleteDailyTasks, completedDailyTasks, flexibleTasks,
    selectedDate, isSelectedToday, dailySectionLabel,
    exitingTaskIds, onTaskClick, onTaskUpdate, onUpdateProgress, onAfterAction, onSelectDate,
}) => {
    const week = computeWeek(new Date(selectedDate));

    return (
    <div className="space-y-6">
        {/* 週日期標籤頁 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-700">本週行程</h3>
            </div>
            <div className="flex items-center justify-center gap-2">
                {week.map((day, idx) => (
                    <button
                        key={day.dateStr}
                        onClick={() => onSelectDate?.(day.dateStr)}
                        className="flex flex-col items-center gap-1 flex-1"
                    >
                        <span className="text-xs font-medium text-gray-500 mb-1">{day.label}</span>
                        <HabitDay
                            status={selectedDate === day.dateStr ? 'inProgress' : day.isToday ? 'done' : 'unstarted'}
                            dateStr={day.dateStr}
                            progress={selectedDate === day.dateStr ? 0.5 : 0}
                        />
                    </button>
                ))}
            </div>
        </div>

        <div>
            <div className="flex items-center gap-2 mb-4">
                <CalendarDays size={20} className="text-[#169E6B]" />
                <h3 className="text-xl font-bold text-[#1A1A1A]">{dailySectionLabel}</h3>
            </div>

            {/* 未完成任務 */}
            {incompleteDailyTasks.length > 0 && (
                <div className="space-y-3 mb-4">
                    {incompleteDailyTasks.map(task => {
                        const isExiting = exitingTaskIds.has(task.id);
                        return (
                            <div
                                key={task.id}
                                className={`overflow-hidden transition-all duration-300 ease-out ${
                                    isExiting ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[640px] opacity-100'
                                }`}
                            >
                                <TaskCard
                                    task={task}
                                    viewingDate={selectedDate}
                                    onClick={() => onTaskClick(task)}
                                    onUpdate={onTaskUpdate}
                                    onAfterAction={onAfterAction}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 已完成區塊 */}
            {completedDailyTasks.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 size={15} className="text-[#169E6B]" />
                        <span className="text-xs font-medium text-[#169E6B] uppercase tracking-wider">
                            已完成 {completedDailyTasks.length} 個
                        </span>
                        <div className="flex-1 h-px bg-[#169E6B]/20" />
                    </div>
                    <div className="space-y-3 opacity-60">
                        {completedDailyTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                viewingDate={selectedDate}
                                onClick={() => onTaskClick(task)}
                                onUpdate={onUpdateProgress}
                                onAfterAction={onAfterAction}
                            />
                        ))}
                    </div>
                </div>
            )}

            {incompleteDailyTasks.length === 0 && completedDailyTasks.length === 0 && (
                <p className="text-[#9CA3AF] text-sm">
                    {isSelectedToday ? '今日無固定行程。' : '這天沒有安排任務。'}
                </p>
            )}
        </div>

        {isSelectedToday && flexibleTasks.length > 0 && (
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Target size={20} className="text-[#F59E0B]" />
                    <h3 className="text-xl font-bold text-[#1A1A1A]">週期目標</h3>
                </div>
                <div className="space-y-3">
                    {flexibleTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            viewingDate={selectedDate}
                            onClick={() => onTaskClick(task)}
                            onUpdate={onUpdateProgress}
                            onAfterAction={onAfterAction}
                        />
                    ))}
                </div>
            </div>
        )}
    </div>
    );
};

export default DailyTasksSection;
