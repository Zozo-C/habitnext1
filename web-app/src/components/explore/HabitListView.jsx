"use client";

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import HabitCard from './HabitCard';

// NOTE (2026-05-25, Slice K Task 11): the 「清單 ｜ 焦點地圖」view-mode
// toggle was removed here. Spec v2 reframed the add-flow around the
// aspiration picker, and FocusMap (impact × ability) is no longer in the
// user's main path. The FocusMap component itself is kept (admin / debug
// tool); OfficialHabit.impact / ability data + tests stay valid. Only the
// HabitListView toggle was wrong-placed for v2's UX.

function getDefaultDifficulty(habit) {
  const diffs = habit.difficulties || {};
  if (diffs.beginner?.enabled) return 'beginner';
  if (diffs.intermediate?.enabled) return 'intermediate';
  if (diffs.challenge?.enabled) return 'challenge';
  return 'beginner';
}

export default function HabitListView({
  habits,
  selectedDifficulty,
  setSelectedDifficulty,
  onSelectHabit,
  emptyText,
  multiSelectMode = false,
}) {
  const [checkedHabits, setCheckedHabits] = useState(new Set());

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {emptyText || '這個面向目前還沒有推薦習慣'}
      </div>
    );
  }

  const handleSelectDifficulty = (habitId, difficulty) => {
    setSelectedDifficulty(prev => ({ ...prev, [habitId]: difficulty }));
  };

  const handleToggleCheck = (habitId) => {
    const newChecked = new Set(checkedHabits);
    if (newChecked.has(habitId)) {
      newChecked.delete(habitId);
    } else {
      newChecked.add(habitId);
    }
    setCheckedHabits(newChecked);
  };

  const handleAddBatch = () => {
    const habitsToAdd = Array.from(checkedHabits).map(habitId => {
      const habit = habits.find(h => h.id === habitId);
      const difficulty = selectedDifficulty[habitId] || getDefaultDifficulty(habit);
      return { habit, difficulty };
    });

    // Call onSelectHabit for each checked habit
    habitsToAdd.forEach(({ habit, difficulty }) => {
      onSelectHabit(habit, difficulty);
    });

    // Clear selection
    setCheckedHabits(new Set());
  };


  return (
    <div className="space-y-3 pb-4">
      {multiSelectMode && (
        <div className="px-2 py-2 text-xs text-gray-500">
          已選擇 {checkedHabits.size}/{habits.length}
        </div>
      )}

      {habits.map(habit => (
        <div key={habit.id} className="flex gap-2 items-start">
          {multiSelectMode && (
            <div className="pt-4 flex-shrink-0">
              <label className="relative flex items-center cursor-pointer w-6 h-6 mt-0.5">
                <input
                  type="checkbox"
                  checked={checkedHabits.has(habit.id)}
                  onChange={() => handleToggleCheck(habit.id)}
                  className="absolute opacity-0 w-6 h-6 cursor-pointer"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    checkedHabits.has(habit.id)
                      ? 'border-[#169E6B] bg-[#169E6B]'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {checkedHabits.has(habit.id) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>
            </div>
          )}
          <div className="flex-1">
            <HabitCard
              habit={habit}
              selectedDifficulty={selectedDifficulty[habit.id] || getDefaultDifficulty(habit)}
              onSelectDifficulty={handleSelectDifficulty}
              onSelectHabit={multiSelectMode ? undefined : onSelectHabit}
              showAddButton={!multiSelectMode}
            />
          </div>
        </div>
      ))}

      {multiSelectMode && checkedHabits.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              已選擇 {checkedHabits.size} 個習慣
            </span>
            <button
              type="button"
              onClick={handleAddBatch}
              className="flex items-center gap-2 px-4 py-2 text-white font-bold rounded-lg transition-colors"
              style={{
                backgroundColor: '#169E6B',
              }}
            >
              <Check size={16} /> 批量加入
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
