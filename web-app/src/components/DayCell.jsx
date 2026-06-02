'use client';

import React from 'react';
import HabitDay from './HabitDay';

// DayCell — a single day cell in the week selector
// Wraps the day label and HabitDay component with selection styling
//
// Props:
//   cell              — { label, dateStr, dayNum, month, isToday }
//   isSelected        — boolean, whether this day is currently selected
//   habitStatus       — 'empty' | 'unstarted' | 'inProgress' | 'done'
//   progress          — number (0-1), only used for inProgress status
//   onSelect          — (dateStr) => void
//   onSwipeDetected   — boolean ref to check if a swipe just occurred

const DayCell = ({ cell, isSelected, habitStatus, progress = 0, onSelect, swipedRef }) => {
  return (
    <button
      type="button"
      onClick={() => {
        if (swipedRef.current) return;
        onSelect?.(cell.dateStr);
      }}
      className={`flex flex-col items-center justify-center py-2 px-2 cursor-pointer relative transition-colors active:scale-95 ${
        isSelected ? 'border-2 border-gray-300 rounded-full' : ''
      }`}
    >
      <span className="text-[11px] leading-none text-gray-600 mb-1">{cell.label}</span>
      <HabitDay
        status={habitStatus}
        progress={progress}
        dateStr={cell.dateStr}
      />
    </button>
  );
};

export default DayCell;
