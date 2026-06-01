"use client";
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HabitCalendarCard from './HabitCalendarCard';
import { getTodayStr } from '@/lib/utils';

const MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

const MyPlansView = ({ tasks, groupedTasks, soloTasks, loading, onTaskClick }) => {
    const today = new Date(getTodayStr());
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [activeFilter, setActiveFilter] = useState(null);
    const todayStr = getTodayStr();

    const prevMonth = () => {
        if (month === 0) { setYear(y => y - 1); setMonth(11); }
        else setMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (month === 11) { setYear(y => y + 1); setMonth(0); }
        else setMonth(m => m + 1);
    };

    const categories = useMemo(() =>
        groupedTasks.map(g => ({ id: g.id, label: g.template?.name || '專屬計畫' })),
        [groupedTasks]
    );

    const allActiveTasks = useMemo(() => {
        const fromGroups = groupedTasks.flatMap(g => g.tasks || []);
        return [...fromGroups, ...soloTasks].filter(t => !t.status || t.status === 'active');
    }, [groupedTasks, soloTasks]);

    const filtered = useMemo(() => {
        if (!activeFilter) return allActiveTasks;
        return (groupedTasks.find(g => g.id === activeFilter)?.tasks || [])
            .filter(t => !t.status || t.status === 'active');
    }, [activeFilter, allActiveTasks, groupedTasks]);

    return (
        <div>
            {/* Month navigator */}
            <div className="flex items-center justify-center gap-4 mb-3">
                <button type="button" onClick={prevMonth} className="p-1 text-gray-400 hover:text-gray-600 active:opacity-50 transition-opacity">
                    <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-[#1A1A1A]">{year}年{MONTHS[month]}</span>
                <button type="button" onClick={nextMonth} className="p-1 text-gray-400 hover:text-gray-600 active:opacity-50 transition-opacity">
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Category filter chips */}
            {categories.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 mb-4 pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
                            className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border transition-all active:scale-95 ${
                                activeFilter === cat.id
                                    ? 'bg-[#169E6B]/10 text-[#169E6B] border-[#169E6B]'
                                    : 'text-gray-500 border-gray-200 bg-white'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Grid */}
            {loading && <p className="text-center py-10 text-gray-400 text-sm">載入中...</p>}
            {!loading && filtered.length === 0 && (
                <p className="text-center py-10 text-gray-400 text-sm">沒有進行中的習慣</p>
            )}
            <div className="grid grid-cols-2 gap-3 px-4 pb-24 md:pb-6">
                {filtered.map(task => (
                    <HabitCalendarCard
                        key={task.id}
                        task={task}
                        year={year}
                        month={month}
                        todayStr={todayStr}
                        onClick={() => onTaskClick(task)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyPlansView;
