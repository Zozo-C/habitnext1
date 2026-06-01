"use client";
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, UserCircle2 } from 'lucide-react';
import HabitCalendarCard from './HabitCalendarCard';
import { getTodayStr, isCompletedOnDate } from '@/lib/utils';

const MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

function calcMonthPct(task, year, month, todayStr) {
    const days = getDaysInMonth(year, month);
    const past = [];
    for (let d = 1; d <= days; d++) {
        const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        if (ds <= todayStr) past.push(ds);
    }
    if (!past.length) return 0;
    const done = past.filter(ds => isCompletedOnDate(task, ds)).length;
    return Math.round(done / past.length * 100);
}

function IdentityCard({ identity, tasks, year, month, todayStr, onTaskClick }) {
    const [open, setOpen] = useState(true);
    const avgPct = tasks.length
        ? Math.round(tasks.reduce((sum, t) => sum + calcMonthPct(t, year, month, todayStr), 0) / tasks.length)
        : 0;

    return (
        <div className="mb-6">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between mb-3 group"
            >
                <div className="flex items-center gap-2">
                    <UserCircle2 size={16} className="text-[#169E6B]" />
                    <span className="text-sm font-bold text-[#1A1A1A]">{identity}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{tasks.length} 個習慣 · {avgPct}% 完成</span>
                    <ChevronLeft size={14} className={`text-gray-400 transition-transform ${open ? '-rotate-90' : 'rotate-0'}`} />
                </div>
            </button>
            {open && (
                <div className="grid grid-cols-2 gap-3">
                    {tasks.map(task => (
                        <HabitCalendarCard key={task.id} task={task} year={year} month={month} todayStr={todayStr} onClick={() => onTaskClick(task)} />
                    ))}
                </div>
            )}
        </div>
    );
}

const MyPlansView = ({ tasks, groupedTasks, soloTasks, loading, onTaskClick }) => {
    const today = new Date(getTodayStr());
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'identity'
    const [activeFilter, setActiveFilter] = useState(null);
    const todayStr = getTodayStr();

    const prevMonth = () => { if (month === 0) { setYear(y=>y-1); setMonth(11); } else setMonth(m=>m-1); };
    const nextMonth = () => { if (month === 11) { setYear(y=>y+1); setMonth(0); } else setMonth(m=>m+1); };

    const categories = useMemo(() => groupedTasks.map(g => ({ id: g.id, label: g.template?.name || '專屬計畫' })), [groupedTasks]);

    const allActiveTasks = useMemo(() => {
        const fromGroups = groupedTasks.flatMap(g => g.tasks || []);
        return [...fromGroups, ...soloTasks].filter(t => !t.status || t.status === 'active');
    }, [groupedTasks, soloTasks]);

    const filtered = useMemo(() => {
        if (!activeFilter) return allActiveTasks;
        return (groupedTasks.find(g => g.id === activeFilter)?.tasks || []).filter(t => !t.status || t.status === 'active');
    }, [activeFilter, allActiveTasks, groupedTasks]);

    const identityGroups = useMemo(() => {
        const map = {};
        allActiveTasks.forEach(t => {
            const key = t.identity?.trim() || '未設定身分';
            if (!map[key]) map[key] = [];
            map[key].push(t);
        });
        // Put 未設定身分 last
        const entries = Object.entries(map).sort(([a], [b]) => {
            if (a === '未設定身分') return 1;
            if (b === '未設定身分') return -1;
            return 0;
        });
        return entries;
    }, [allActiveTasks]);

    return (
        <div>
            {/* Month navigator + view toggle */}
            <div className="flex items-center justify-between px-4 mb-3">
                <div className="flex items-center gap-2">
                    <button type="button" onClick={prevMonth} className="p-1 text-gray-400 hover:text-gray-600 active:opacity-50 transition-opacity">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-semibold text-[#1A1A1A]">{year}年{MONTHS[month]}</span>
                    <button type="button" onClick={nextMonth} className="p-1 text-gray-400 hover:text-gray-600 active:opacity-50 transition-opacity">
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button type="button" onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#169E6B]' : 'text-gray-400'}`}>
                        <LayoutGrid size={15} />
                    </button>
                    <button type="button" onClick={() => setViewMode('identity')} className={`p-1.5 rounded-md transition-all ${viewMode === 'identity' ? 'bg-white shadow-sm text-[#169E6B]' : 'text-gray-400'}`}>
                        <UserCircle2 size={15} />
                    </button>
                </div>
            </div>

            {/* Category filter chips (grid mode only) */}
            {viewMode === 'grid' && categories.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 mb-4 pb-1">
                    {categories.map(cat => (
                        <button key={cat.id} type="button" onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
                            className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border transition-all active:scale-95 ${activeFilter === cat.id ? 'bg-[#169E6B]/10 text-[#169E6B] border-[#169E6B]' : 'text-gray-500 border-gray-200 bg-white'}`}>
                            {cat.label}
                        </button>
                    ))}
                </div>
            )}

            {loading && <p className="text-center py-10 text-gray-400 text-sm">載入中...</p>}

            {!loading && viewMode === 'grid' && (
                filtered.length === 0
                    ? <p className="text-center py-10 text-gray-400 text-sm">沒有進行中的習慣</p>
                    : <div className="grid grid-cols-2 gap-3 px-4 pb-24 md:pb-6">
                        {filtered.map(task => (
                            <HabitCalendarCard key={task.id} task={task} year={year} month={month} todayStr={todayStr} onClick={() => onTaskClick(task)} />
                        ))}
                    </div>
            )}

            {!loading && viewMode === 'identity' && (
                allActiveTasks.length === 0
                    ? <p className="text-center py-10 text-gray-400 text-sm">沒有進行中的習慣</p>
                    : <div className="px-4 pb-24 md:pb-6">
                        {identityGroups.map(([identity, identityTasks]) => (
                            <IdentityCard key={identity} identity={identity} tasks={identityTasks} year={year} month={month} todayStr={todayStr} onTaskClick={onTaskClick} />
                        ))}
                    </div>
            )}
        </div>
    );
};

export default MyPlansView;
