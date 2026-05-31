import React from 'react';
import { Target, Flame } from 'lucide-react';
import { getTodayStr, isCompletedToday, calculatePeriodProgress, isTaskDueToday } from '@/lib/utils';

const DashboardSummaryCard = ({ tasks, onOpenDetail }) => {
    const activeTasks = tasks.filter(t => !t.recurrence?.mode?.includes('period') && isTaskDueToday(t));
    const totalTasks = activeTasks.length;
    let score = 0;
    activeTasks.forEach(t => {
        if (t.type === 'quantitative') {
            const curr = t.dailyProgress?.[getTodayStr()]?.value || 0;
            score += (100 / totalTasks) * Math.min(1, curr / (t.dailyTarget || 1));
        } else {
            score += isCompletedToday(t) ? (100 / totalTasks) : 0;
        }
    });
    const finalScore = totalTasks > 0 ? Math.round(score) : 0;
    const completedCount = activeTasks.filter(t => isCompletedToday(t)).length;

    const periodTasks = tasks.filter(t => t.recurrence?.mode === 'period_count' && t.frequency === 'weekly');
    const periodDone = periodTasks.filter(t => calculatePeriodProgress(t) >= t.recurrence.periodTarget).length;

    return (
        <div className="mb-4">
            <div
                onClick={onOpenDetail}
                className="relative rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 mb-3 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #169E6B 0%, #004F51 100%)' }}
            >
                {/* 大半透明圓裝飾 */}
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white rounded-full opacity-10 pointer-events-none" />
                <div className="absolute -right-2 top-12 w-24 h-24 bg-white rounded-full opacity-[0.07] pointer-events-none" />

                <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">TODAY'S SCORE</p>
                <div className="flex items-end justify-between mb-4">
                    <div>
                        <span className="text-6xl font-bold text-white">{finalScore}</span>
                        <span className="text-lg text-white/50 ml-1">/ 100</span>
                    </div>
                    <span className="text-sm text-white/70 mb-1">
                        {totalTasks === 0 ? '尚未建立習慣' : `${completedCount} / ${totalTasks} 完成`}
                    </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                        className="bg-white h-2 rounded-full transition-all duration-700 ease-in-out"
                        style={{ width: `${finalScore}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Target size={14} className="text-[#169E6B]" />
                        <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">本週目標</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#1A1A1A]">{periodDone}</span>
                        <span className="text-xs text-[#9CA3AF]">/ {periodTasks.length}</span>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2">
                        <Flame size={14} className="text-[#F59E0B]" />
                        <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">連續紀錄</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#1A1A1A]">5</span>
                        <span className="text-xs text-[#9CA3AF]">天</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSummaryCard;
