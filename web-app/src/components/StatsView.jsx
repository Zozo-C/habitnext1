'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import StreakHero from './stats/StreakHero';
import CompletionRateCards from './stats/CompletionRateCards';
import DomainBreakdownChart from './stats/DomainBreakdownChart';
import WeeklyHeatmap from './stats/WeeklyHeatmap';
import TaskStreakList from './stats/TaskStreakList';

const todayString = () => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
};

const isEmpty = (stats) => {
    if (!stats) return true;
    const noStreak = (stats.overall?.currentStreak ?? 0) === 0
        && (stats.overall?.longestStreak ?? 0) === 0;
    const emptyHeatmap = !stats.heatmap || stats.heatmap.every(d => d.count === 0);
    return noStreak && emptyHeatmap;
};

const Header = ({ onBack }) => (
    <div className="flex items-center gap-3 mb-1 px-1">
        {onBack && (
            <button
                onClick={onBack}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="返回"
            >
                <ArrowLeft size={20} />
            </button>
        )}
        <h2 className="text-xl font-bold text-gray-800">統計</h2>
    </div>
);

const StatsView = ({ userId, onBack }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date();
        return { year: today.getFullYear(), month: today.getMonth() + 1 };
    });

    // Calculate month stats - MUST be before all conditional returns
    const monthStats = useMemo(() => {
        if (!stats?.heatmap) return { greenDays: 0, totalDays: 0, rate: 0, totalCompleted: 0 };

        const monthStr = `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}`;
        const daysInMonth = new Date(selectedMonth.year, selectedMonth.month, 0).getDate();

        const monthData = stats.heatmap.filter(d => d.date.startsWith(monthStr));
        const greenDays = monthData.filter(d => d.count > 0).length;
        const totalCompleted = monthData.reduce((sum, d) => sum + d.count, 0);

        return {
            greenDays,
            totalDays: daysInMonth,
            rate: Math.round((greenDays / daysInMonth) * 100),
            totalCompleted,
        };
    }, [stats?.heatmap, selectedMonth]);

    const monthNavigation = (direction) => {
        const newMonth = new Date(selectedMonth.year, selectedMonth.month - 1 + direction, 1);
        setSelectedMonth({ year: newMonth.getFullYear(), month: newMonth.getMonth() + 1 });
    };

    const monthCN = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][selectedMonth.month - 1];

    useEffect(() => {
        let cancelled = false;

        const mockStats = {
            overall: {
                currentStreak: 12,
                longestStreak: 28,
                todayCompleted: true,
            },
            completionRate: {
                last7: 0.857,
                last30: 0.733,
            },
            domainBreakdown: [
                { name: '飲食', count: 28, color: '#f59e0b' },
                { name: '運動', count: 22, color: '#ef4444' },
                { name: '睡眠', count: 18, color: '#8b5cf6' },
                { name: '專注', count: 16, color: '#3b82f6' },
                { name: '社交', count: 16, color: '#06b6d4' },
                { name: '飲水', count: 12, color: '#10b981' },
                { name: '閱讀', count: 10, color: '#ec4899' },
                { name: '冥想', count: 8, color: '#a78bfa' },
                { name: '工作', count: 6, color: '#6366f1' },
            ],
            heatmap: Array.from({ length: 84 }, (_, i) => ({
                date: new Date(Date.now() - (84 - i - 1) * 86400000).toISOString().split('T')[0],
                count: Math.floor(Math.random() * 8),
            })),
            topTaskStreaks: [
                { taskId: '1', title: '早起', streak: 18 },
                { taskId: '2', title: '喝水', streak: 15 },
                { taskId: '3', title: '運動30分', streak: 12 },
                { taskId: '4', title: '冥想', streak: 10 },
                { taskId: '5', title: '早睡', streak: 8 },
            ],
        };

        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const today = todayString();
                const res = await fetch(`/api/stats?userId=${encodeURIComponent(userId)}&today=${today}`, {
                    signal: AbortSignal.timeout(3000),
                });
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                const data = await res.json();
                if (!cancelled) setStats(data);
            } catch (err) {
                console.warn('Stats API failed, using mock data:', err.message);
                if (!cancelled) setStats(mockStats);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        if (userId) load();
        return () => { cancelled = true; };
    }, [userId]);

    if (loading) {
        return (
            <div className="p-4 space-y-4 w-full">
                <Header onBack={onBack} />
                <div className="text-center text-gray-400 py-12">載入中…</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 space-y-4 w-full">
                <Header onBack={onBack} />
                <div className="text-center text-gray-500 py-12">
                    <p>統計暫時無法載入：{error}</p>
                </div>
            </div>
        );
    }

    if (isEmpty(stats)) {
        return (
            <div className="p-4 space-y-4 w-full">
                <Header onBack={onBack} />
                <div className="text-center text-gray-500 py-12">
                    <p className="text-base">打完第一個卡再回來看 📊</p>
                    <p className="text-xs text-gray-400 mt-2">統計需要至少一天的紀錄才有故事</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-2 w-full">
            <Header onBack={onBack} />

            {/* 1. Current Streak */}
            <StreakHero overall={stats.overall} />

            {/* 2. Completion Rate + Calendar */}
            <div className="bg-white border border-gray-200/50 rounded-3xl p-5 shadow-lg">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-gray-100">
                    {/* 7-day completion rate */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">最近 7 天</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {Math.round((stats.completionRate?.last7 || 0) * 100)}<span className="text-sm text-gray-400 ml-1">%</span>
                        </p>
                    </div>

                    {/* 30-day completion rate */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">最近 30 天</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {Math.round((stats.completionRate?.last30 || 0) * 100)}<span className="text-sm text-gray-400 ml-1">%</span>
                        </p>
                    </div>

                    {/* Green days this month */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">本月綠燈</p>
                        <p className="text-2xl font-bold text-emerald-500">{monthStats.greenDays}</p>
                    </div>
                </div>

                {/* Calendar Navigation */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => monthNavigation(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                        aria-label="上個月"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-sm font-medium text-gray-700 flex-1 text-center">
                        {selectedMonth.year}年{monthCN}
                    </h3>
                    <button
                        onClick={() => monthNavigation(1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                        aria-label="下個月"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Calendar Heatmap */}
                <WeeklyHeatmap heatmap={stats.heatmap} selectedMonth={selectedMonth} />
            </div>

            {/* 4. Domain Breakdown */}
            <DomainBreakdownChart breakdown={stats.domainBreakdown} />

            {/* 5. Task Streaks */}
            <TaskStreakList topTaskStreaks={stats.topTaskStreaks} />
        </div>
    );
};

export default StatsView;
