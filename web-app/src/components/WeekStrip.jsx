'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { getTodayStr } from '@/lib/utils';
import DayCell from './DayCell';

// WeekStrip — the Mon-Sun date selector shown on the daily view.
//
// Extracted from AppHeader (2026-05-30) so it can render in two places:
//   1. Inside AppHeader on mobile (AppHeader itself is md:hidden).
//   2. At the top of the desktop daily view in MainApp, since the desktop
//      layout hides AppHeader entirely and used the sidebar for nav — which
//      left desktop users with NO way to switch dates.
//
// Owns its own week-anchor state + swipe gesture handling. Tapping a day
// fires onSelectDate(dateStr); horizontal swipe (mobile) shifts ±7 days.
//
// Props:
//   selectedDate  — 'YYYY-MM-DD' currently-viewed day (controlled by parent)
//   onSelectDate  — (dateStr) => void
//   className     — extra classes for the outer wrapper (e.g. border, padding)

const SWIPE_THRESHOLD = 45;
const WEEK_DAY_LABELS = ['一', '二', '三', '四', '五', '六', '日']; // Mon..Sun

const computeWeek = (anchorDate) => {
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

const WeekStrip = ({ selectedDate, onSelectDate, className = '' }) => {
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

    const shiftWeek = (deltaDays) => {
        const d = new Date(weekAnchor);
        d.setDate(d.getDate() + deltaDays);
        setWeekAnchor(d);
    };

    // Swipe handling — horizontal swipe ≥ threshold shifts ±7 days. swipedRef
    // guards the cell onClick so a drag-end doesn't accidentally tap a day.
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
            shiftWeek(dx < 0 ? 7 : -7);
        }
        setTimeout(() => { swipedRef.current = false; }, 0);
    };

    return (
        <div
            className={`relative flex items-center touch-pan-y select-none bg-transparent ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Desktop prev/next week chevrons — swipe isn't available without
                touch, so give mouse users explicit controls. Hidden on mobile
                where swipe handles it. */}
            <button
                type="button"
                onClick={() => shiftWeek(-7)}
                className="hidden md:flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex-shrink-0 mr-1"
                aria-label="上一週"
            >
                ‹
            </button>

            {weekCells.map((cell) => {
                const isSelected = selectedDate === cell.dateStr;
                // Determine habit status: done if selected, unstarted otherwise
                // In the future, this could be connected to actual habit data
                const habitStatus = isSelected ? 'done' : 'unstarted';

                return (
                    <DayCell
                        key={cell.dateStr}
                        cell={cell}
                        isSelected={isSelected}
                        habitStatus={habitStatus}
                        progress={0}
                        onSelect={onSelectDate}
                        swipedRef={swipedRef}
                    />
                );
            })}

            <button
                type="button"
                onClick={() => shiftWeek(7)}
                className="hidden md:flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex-shrink-0 ml-1"
                aria-label="下一週"
            >
                ›
            </button>
        </div>
    );
};

export default WeekStrip;
