'use client';

import React, { useState } from 'react';
import HabitDay from './HabitDay';

type DayStatus = 'empty' | 'unstarted' | 'inProgress' | 'done';

export default function HabitDayDemo() {
  const [status, setStatus] = useState<DayStatus>('unstarted');
  const [progress, setProgress] = useState(0.5);

  // 生成本週的日期
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 標題 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">HabitDay 元件 Demo</h1>
          <p className="text-gray-600">自由雕琢日期選擇器的樣式和動畫</p>
        </div>

        {/* 控制面板 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">元件控制</h2>

          {/* 狀態選擇 */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              狀態
            </label>
            <div className="flex gap-3 flex-wrap">
              {(['empty', 'unstarted', 'inProgress', 'done'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    status === s
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 進度控制 */}
          {status === 'inProgress' && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                進度: {Math.round(progress * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={progress}
                onChange={(e) => setProgress(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {/* 預覽 */}
          <div className="border-t pt-8">
            <p className="text-sm text-gray-600 mb-4">預覽</p>
            <div className="flex justify-center p-8 bg-gray-50 rounded-xl">
              <HabitDay
                status={status}
                progress={progress}
                dateStr={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        {/* 週視圖 Demo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">週選擇器預覽</h2>
          <p className="text-gray-600 mb-6">
            目前的設計 - 這是你要改造的部分
          </p>

          {/* 簡化的週選擇器 */}
          <div className="flex gap-2 overflow-x-auto pb-4">
            {weekDates.map((date, idx) => {
              const dayLabels = ['一', '二', '三', '四', '五', '六', '日'];
              return (
                <div key={date} className="flex flex-col items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600">
                    {dayLabels[idx]}
                  </span>
                  <HabitDay
                    status={idx === 3 ? 'done' : 'unstarted'}
                    dateStr={date}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 所有狀態展示 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">所有狀態展示</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(['empty', 'unstarted', 'inProgress', 'done'] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-4">
                <div className="flex justify-center p-6 bg-gray-50 rounded-xl w-full">
                  <HabitDay
                    status={s}
                    progress={s === 'inProgress' ? 0.65 : undefined}
                    dateStr={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <p className="text-sm font-semibold text-gray-700">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
