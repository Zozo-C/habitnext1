"use client";
import IconRenderer from './IconRenderer';
import { CATEGORY_CONFIG, resolveIconKey } from '@/lib/constants';
import { isCompletedOnDate } from '@/lib/utils';

const COLOR_HEX = {
    'text-blue-500':    '#3B82F6',
    'text-pink-500':    '#EC4899',
    'text-orange-500':  '#F97316',
    'text-indigo-500':  '#6366F1',
    'text-yellow-500':  '#EAB308',
    'text-purple-500':  '#A855F7',
    'text-fuchsia-500': '#D946EF',
    'text-rose-500':    '#F43F5E',
    'text-slate-500':   '#64748B',
    'text-red-500':     '#EF4444',
    'text-yellow-600':  '#CA8A04',
    'text-green-500':   '#22C55E',
    'text-amber-600':   '#D97706',
    'text-lime-600':    '#65A30D',
    'text-sky-500':     '#0EA5E9',
    'text-gray-400':    '#9CA3AF',
};

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOffset = (year, month) => (new Date(year, month, 1).getDay() + 6) % 7;

const HabitCalendarCard = ({ task, year, month, todayStr, onClick }) => {
    const config = CATEGORY_CONFIG[resolveIconKey(task.category)] || {};
    const doneColor = COLOR_HEX[config.color] || '#169E6B';
    const daysInMonth = getDaysInMonth(year, month);
    const offset = getFirstDayOffset(year, month);

    const cells = [
        ...Array(offset).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => {
            const d = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isFuture = dateStr > todayStr;
            const isDone = !isFuture && isCompletedOnDate(task, dateStr);
            return { d, dateStr, isFuture, isDone };
        }),
    ];

    const pastCells = cells.filter(c => c && !c.isFuture);
    const doneCells = pastCells.filter(c => c.isDone);
    const pct = pastCells.length > 0 ? Math.round((doneCells.length / pastCells.length) * 100) : 0;
    const isFullyDone = pct === 100 && pastCells.length > 0;

    return (
        <div
            className="bg-white rounded-2xl p-3 shadow-sm border border-gray-50"
        >
            <div className="flex items-start justify-between mb-2 gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                    <IconRenderer category={task.category} size={16} className={config.type === 'emoji' ? 'text-base' : ''} />
                    <p className="text-xs font-semibold text-[#1A1A1A] line-clamp-2 leading-tight">{task.title || '(無標題)'}</p>
                </div>
                {isFullyDone && <span className="text-xs shrink-0">✅</span>}
            </div>

            {/* Mini calendar grid */}
            <div className="grid grid-cols-7 gap-[2px] mb-1">
                {['一','二','三','四','五','六','日'].map(d => (
                    <div key={d} className="flex items-center justify-center">
                        <span className="text-[8px] text-gray-400 font-medium">{d}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-[2px] mb-2">
                {cells.map((cell, i) => (
                    <div
                        key={i}
                        className={`aspect-square rounded-[2px] flex items-center justify-center ${
                            !cell ? '' :
                            cell.isFuture ? 'bg-gray-100' :
                            cell.isDone ? '' : 'bg-gray-400'
                        }`}
                        style={cell?.isDone ? { backgroundColor: doneColor } : undefined}
                    >
                        {cell && (
                            <span className={`text-[11px] font-semibold leading-none text-white`}>
                                {cell.d}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>🕐 {pct}%</span>
                <span>✓ {doneCells.length}</span>
            </div>
        </div>
    );
};

export default HabitCalendarCard;
