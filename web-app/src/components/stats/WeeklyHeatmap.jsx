import React from 'react';

// WeeklyHeatmap — Calendar-style heatmap
// 7 columns (Sun-Sat) × N rows, shows day numbers like a calendar
// Color buckets: 0 (gray) / 1 (light yellow) / 2-3 (yellow) / 4+ (green)

const bucketClass = (count) => {
    if (count <= 0) return 'bg-gray-100';
    if (count === 1) return 'bg-yellow-200';
    if (count <= 3) return 'bg-yellow-400';
    return 'bg-emerald-500';
};

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

const WeeklyHeatmap = ({ heatmap, selectedMonth }) => {
    if (!heatmap || heatmap.length === 0) return null;

    // Create a map of date → count for quick lookup
    const dateMap = {};
    heatmap.forEach((entry) => {
        dateMap[entry.date] = entry.count;
    });

    // Use selected month or default to first month in data
    const year = selectedMonth?.year || new Date().getFullYear();
    const month = selectedMonth?.month || new Date().getMonth() + 1;
    const monthCN = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][month - 1];

    // Get the weekday of the first date (0=Sunday, 6=Saturday)
    const firstDateObj = new Date(year, month - 1, 1);
    const startingWeekday = firstDateObj.getDay();

    // Build calendar grid
    const grid = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    // Add empty cells before the first day
    let currentRow = Array(startingWeekday).fill(null);

    // Add all days of the month
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        currentRow.push({ date: dateStr, day: d, count: dateMap[dateStr] || 0 });

        if (currentRow.length === 7) {
            grid.push(currentRow);
            currentRow = [];
        }
    }

    // Pad the last row
    if (currentRow.length > 0) {
        while (currentRow.length < 7) {
            currentRow.push(null);
        }
        grid.push(currentRow);
    }

    return (
        <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">每月紅綠燈行事曆</p>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {WEEKDAYS.map((wd) => (
                    <div key={wd} className="text-xs font-semibold text-gray-600 text-center py-1">
                        {wd}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="space-y-2">
                {grid.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 gap-2">
                        {week.map((dayEntry, di) => (
                            <div key={di} className="flex justify-center">
                                {dayEntry ? (
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm transition-colors ${bucketClass(dayEntry.count)}`}
                                        title={`${dayEntry.date} · ${dayEntry.count} 個完成`}
                                    >
                                        <span className={dayEntry.count === 0 ? 'text-gray-400' : 'text-gray-700'}>
                                            {dayEntry.day}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="w-10 h-10" />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 justify-center">
                <span>少</span>
                <span className="w-4 h-4 rounded bg-gray-100" />
                <span className="w-4 h-4 rounded bg-yellow-200" />
                <span className="w-4 h-4 rounded bg-yellow-400" />
                <span className="w-4 h-4 rounded bg-emerald-500" />
                <span>多</span>
            </div>
        </div>
    );
};

export default WeeklyHeatmap;
