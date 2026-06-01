"use client";
import { useState } from 'react';
import { CalendarDays, CheckCircle2, Target, ChevronDown } from 'lucide-react';
import TaskCard from './TaskCard';

const DailyTasksSection = ({
    incompleteDailyTasks, completedDailyTasks, flexibleTasks,
    selectedDate, isSelectedToday, dailySectionLabel,
    exitingTaskIds, onTaskClick, onTaskUpdate, onUpdateProgress, onAfterAction,
}) => {
    const [completedOpen, setCompletedOpen] = useState(true);

    return (
        <div className="space-y-6">
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
                        <button
                            type="button"
                            onClick={() => setCompletedOpen(o => !o)}
                            className="flex items-center gap-2 mb-3 w-full hover:opacity-70 active:opacity-50 transition-opacity"
                        >
                            <CheckCircle2 size={15} className="text-[#169E6B]" />
                            <span className="text-xs font-medium text-[#169E6B] uppercase tracking-wider">
                                已完成 {completedDailyTasks.length} 個
                            </span>
                            <div className="flex-1 h-px bg-[#169E6B]/20" />
                            <ChevronDown
                                size={14}
                                className={`text-[#169E6B] transition-transform duration-200 ${completedOpen ? '' : '-rotate-90'}`}
                            />
                        </button>
                        <div className={`space-y-3 opacity-60 overflow-hidden transition-all duration-300 ease-out ${completedOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
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
