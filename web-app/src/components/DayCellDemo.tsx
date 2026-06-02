'use client';

import React, { useState } from 'react';
import DayCell from './DayCell';

export default function DayCellDemo() {
  const [isSelected, setIsSelected] = useState(false);
  const [habitStatus, setHabitStatus] = useState<'empty' | 'unstarted' | 'inProgress' | 'done'>('unstarted');

  const mockCell = {
    label: '一',
    dateStr: '2026-06-02',
    dayNum: 2,
    month: 6,
    isToday: true,
  };

  const mockSwipedRef = {
    current: false,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 標題 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">DayCell 元件 Demo</h1>
          <p className="text-gray-600">自由雕琢週日期選擇器元件的樣式</p>
        </div>

        {/* 控制面板 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">元件控制</h2>

          {/* 選中狀態切換 */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              選中狀態
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setIsSelected(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  !isSelected
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                未選中
              </button>
              <button
                onClick={() => setIsSelected(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                已選中
              </button>
            </div>
          </div>

          {/* 習慣狀態選擇 */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              習慣狀態
            </label>
            <div className="flex gap-3 flex-wrap">
              {(['empty', 'unstarted', 'inProgress', 'done'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setHabitStatus(s)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    habitStatus === s
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 預覽 */}
          <div className="border-t pt-8">
            <p className="text-sm text-gray-600 mb-4">預覽</p>
            <div className="flex justify-center p-12 bg-gray-50 rounded-xl">
              <DayCell
                cell={mockCell}
                isSelected={isSelected}
                habitStatus={habitStatus}
                onSelect={(dateStr) => console.log('Selected:', dateStr)}
                swipedRef={mockSwipedRef}
              />
            </div>
          </div>
        </div>

        {/* 所有組合展示 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">所有組合展示</h2>

          <div className="space-y-8">
            {/* 未選中狀態 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">未選中狀態</h3>
              <div className="grid grid-cols-4 gap-6">
                {(['empty', 'unstarted', 'inProgress', 'done'] as const).map((status) => (
                  <div key={`unselected-${status}`} className="flex flex-col items-center gap-2">
                    <div className="p-8 bg-gray-50 rounded-xl w-full flex justify-center">
                      <DayCell
                        cell={mockCell}
                        isSelected={false}
                        habitStatus={status}
                        onSelect={(dateStr) => console.log('Selected:', dateStr)}
                        swipedRef={mockSwipedRef}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-600">{status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 已選中狀態 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">已選中狀態</h3>
              <div className="grid grid-cols-4 gap-6">
                {(['empty', 'unstarted', 'inProgress', 'done'] as const).map((status) => (
                  <div key={`selected-${status}`} className="flex flex-col items-center gap-2">
                    <div className="p-8 bg-gray-50 rounded-xl w-full flex justify-center">
                      <DayCell
                        cell={mockCell}
                        isSelected={true}
                        habitStatus={status}
                        onSelect={(dateStr) => console.log('Selected:', dateStr)}
                        swipedRef={mockSwipedRef}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-600">{status} (selected)</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
