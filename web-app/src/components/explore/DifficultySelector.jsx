'use client';

import React from 'react';
import { Star } from 'lucide-react';

const DIFFICULTY_OPTIONS = [
  { key: 'beginner',     label: '入門', stars: 1 },
  { key: 'intermediate', label: '進階', stars: 2 },
  { key: 'challenge',    label: '挑戰', stars: 3 },
];

function summarizeCadence(r) {
  if (!r) return '';
  if (r.type === 'daily') {
    return r.periodTarget > 1 ? `每日 ${r.periodTarget} 次` : '每日';
  }
  if (r.type === 'weekly') {
    const days = r.weekDays || [];
    if (days.length === 3 && [1, 3, 5].every(d => days.includes(d))) return '週 3 (一三五)';
    if (days.length === 5 && [1, 2, 3, 4, 5].every(d => days.includes(d))) return '週 5 (週間)';
    if (days.length === 7) return '每日';
    const n = r.periodTarget || days.length || 1;
    return `每週 ${n} 次`;
  }
  if (r.type === 'monthly') {
    const i = r.interval || 1;
    if (i === 12) return '每年';
    if (i === 6) return '每半年';
    if (i === 3) return '每季';
    if (i === 1) return '每月';
    return `每 ${i} 個月`;
  }
  return '';
}

function summarizeDifficulty(config) {
  if (!config) return '';
  const cadence = summarizeCadence(config.recurrence);
  if (config.type === 'quantitative') {
    return `${config.dailyTarget}${config.unit || ''} · ${cadence}`;
  }
  return cadence;
}

function getEnabledDifficulties(habit) {
  const diffs = habit.difficulties || {};
  return DIFFICULTY_OPTIONS.filter(d => diffs[d.key]?.enabled);
}

export default function DifficultySelector({ habit, selectedDifficulty, onSelect }) {
  const enabledDiffs = getEnabledDifficulties(habit);
  const currentDiff = selectedDifficulty || 'beginner';

  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">選擇難度：</p>
      <div className="grid grid-cols-3 gap-2">
        {enabledDiffs.map(diff => {
          const isSelected = currentDiff === diff.key;
          const diffConfig = habit.difficulties[diff.key];
          const summary = summarizeDifficulty(diffConfig);
          return (
            <button
              key={diff.key}
              type="button"
              onClick={() => onSelect(diff.key)}
              className={`flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-lg transition-all border ${
                isSelected
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {/* Star rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < diff.stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs font-bold">{diffConfig?.label || diff.label}</span>
              {summary && (
                <span className="text-[10px] leading-tight opacity-90 text-center">{summary}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
