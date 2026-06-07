'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, Minus, Plus, Lock, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import IconRenderer from './IconRenderer';
import { CATEGORY_CONFIG, resolveIconKey } from '@/lib/constants';
import { isCompletedOnDate } from '@/lib/utils';

const TaskCardDesign = ({ task, onClick, onUpdate = () => { }, viewingDate = '2026-06-07' }) => {
  const [subtasksExpanded, setSubtasksExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isCompletedOnDate(task, viewingDate));

  const config = CATEGORY_CONFIG[resolveIconKey(task.category)];
  const isQuant = task.type === 'quantitative';
  const isPeriod = task.recurrence?.mode === 'period_count';

  // 計次進度
  let currentVal = 0;
  let displayStatus = '';
  let targetVal = 1;

  if (isQuant) {
    currentVal = task.dailyProgress?.[viewingDate]?.value || 0;
    targetVal = task.dailyTarget || 1;
    displayStatus = `${currentVal}/${targetVal} ${task.unit}`;
  } else if (isPeriod) {
    currentVal = task.recurrence?.periodCount || 0;
    targetVal = task.recurrence.periodTarget || 1;
    displayStatus = `${currentVal}/${targetVal} 次`;
  }

  // 用於檢查清單的假資料
  const checklistCount = task.type === 'checklist' ? 2 : 0;
  const checklistTotal = task.type === 'checklist' ? 3 : 0;

  return (
    <div
      onClick={onClick}
      className={`px-5 py-4 rounded-3xl border transition-all cursor-pointer relative overflow-hidden
        ${isCompleted
          ? 'bg-white border-gray-200 opacity-55 shadow-md'
          : 'bg-white border-gray-200/50 shadow-lg hover:shadow-xl active:scale-95'
        }`}
    >
      {/* 完成時的左邊綠色線 */}
      {isCompleted && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-400" />
      )}
      {/* Title & Status */}
      <div className="flex justify-between items-start gap-2 relative z-10">
        <div className="flex items-center gap-3 min-w-0 flex-1 relative z-10">
          <div className={`${config.bg} p-2 rounded-xl flex-shrink-0`}>
            <IconRenderer category={task.category} size={18} className={config.type === 'emoji' ? 'text-2xl' : ''} />
          </div>
          <div className="min-w-0 flex-1">
            {task.cue && (
              <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 leading-tight">
                <span>{task.cue}</span>
                <span className="text-gray-300">→</span>
              </p>
            )}
            <h3 className="font-bold text-sm text-gray-800">
              {task.title || '(無標題)'}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-1">
              {isPeriod ? (task.frequency === 'weekly' ? '本週目標' : '本月目標') : (task.details || '無詳細說明')}
            </p>
          </div>
        </div>

        {/* Right Status Bar */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0 relative z-10">
          {/* 計量任務 & 週期目標 */}
          {(isQuant || isPeriod) && (
            <div className="flex flex-col items-end gap-0.5">
              <span className={`text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap transition-colors ${
                currentVal >= targetVal
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-emerald-50 text-emerald-600'
              }`}>
                {isCompleted ? `🎉 ${displayStatus}` : displayStatus}
              </span>
              {isQuant && (
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-500 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
                  >
                    <Minus size={10} />
                  </button>
                  <input
                    type="number"
                    value={currentVal || 0}
                    readOnly
                    className="w-10 h-5 text-xs text-center border border-gray-300 rounded px-1 bg-white"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="w-6 h-5 flex items-center justify-center text-xs font-bold text-emerald-600 hover:bg-emerald-100 rounded border border-emerald-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 檢查清單 */}
          {task.type === 'checklist' && (
            <div className="flex flex-col items-end gap-0.5">
              <span className={`text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {checklistCount}/{checklistTotal}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setIsCompleted(!isCompleted); }}
                className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-400"
              >
                {isCompleted ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          )}

          {/* 二進制任務 */}
          {!isQuant && !isPeriod && task.type !== 'checklist' && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsCompleted(!isCompleted); }}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isCompleted
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-gray-200 hover:border-emerald-400'
              }`}
            >
              {isCompleted && <Check size={14} className="text-white" strokeWidth={3} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCardDesign;
