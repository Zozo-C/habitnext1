'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import IconRenderer from '../IconRenderer';
import HabitInsightSection from '../insights/HabitInsightSection';
import DifficultySelector from './DifficultySelector';
import { CATEGORY_CONFIG, resolveIconKey } from '@/lib/constants';

export default function HabitCard({
  habit,
  selectedDifficulty,
  onSelectDifficulty,
  onSelectHabit,
  showAddButton = true,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const iconKey = resolveIconKey(habit.icon || habit.category);
  const config = CATEGORY_CONFIG[iconKey];

  const handleSelectDifficulty = (difficulty) => {
    onSelectDifficulty(habit.id, difficulty);
  };

  const handleAddHabit = () => {
    onSelectHabit(habit, selectedDifficulty);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm transition-all ${
        isExpanded ? 'shadow-md' : 'border border-gray-100 hover:shadow-md'
      }`}
      style={isExpanded ? {
        borderWidth: '2px',
        borderColor: '#169E6B',
      } : undefined}
    >
      {/* Header — click to expand/collapse */}
      <button
        type="button"
        onClick={() => setIsExpanded(v => !v)}
        className="w-full text-left p-4 flex items-start justify-between gap-3"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`${config.bg} p-2 rounded-xl flex-shrink-0`}>
            <IconRenderer category={iconKey} size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-800">{habit.name}</h4>
            {habit.description && !isExpanded && (
              <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{habit.description}</p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded body with animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pb-4 pt-3 space-y-3">
              {habit.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  {habit.description}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <HabitInsightSection habitId={habit.id} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <DifficultySelector
                  habit={habit}
                  selectedDifficulty={selectedDifficulty}
                  onSelect={handleSelectDifficulty}
                />
              </motion.div>

              {showAddButton && (
                <motion.button
                  type="button"
                  onClick={handleAddHabit}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-1 text-sm text-white px-3 py-2.5 rounded-xl font-bold transition-colors"
                  style={{
                    backgroundColor: '#169E6B',
                  }}
                >
                  <Plus size={16} /> 加入此習慣
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
