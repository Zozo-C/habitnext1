'use client';

import React from 'react';
import HabitCalendarCard from '../HabitCalendarCard';
import { getTodayStr } from '@/lib/utils';

const ManageView = ({
  tasks,
  loading,
  onTaskClick,
  onDeleteTask,
  onDeleteAssignment,
  onUpdateProgress,
  onOpenCourses,
  onOpenLibrary,
  onOpenTemplateExplorer = () => {},
}) => {
  const activeTasks = tasks.filter(t => !t.status || t.status === 'active');
  const todayStr = getTodayStr();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">探索</h2>

      {/* Explore Section */}
      <div className="mb-6 grid grid-cols-2 gap-2">
        {/* Course Plans Card */}
        <button
          onClick={onOpenCourses}
          className="relative w-full bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow text-left"
        >
          <div className="absolute bottom-0 right-0 w-32 h-full z-0 opacity-20 text-6xl flex items-end justify-end pr-2 pb-2">
            🎓
          </div>
          <div className="relative z-10 p-6 flex flex-col">
            <span className="text-xs font-bold text-emerald-600 mb-3">課程計劃</span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">與線上課程綁定</h3>
            <p className="text-sm text-gray-600 mb-4">由講師精心設計的習慣組合</p>
            <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1">
              立即探索 →
            </span>
          </div>
        </button>

        {/* Explore Habits Card */}
        <button
          onClick={onOpenLibrary}
          className="relative w-full bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow text-left"
        >
          <div className="absolute bottom-0 right-0 w-32 h-full z-0 opacity-20 text-6xl flex items-end justify-end pr-2 pb-2">
            🧭
          </div>
          <div className="relative z-10 p-6 flex flex-col">
            <span className="text-xs font-bold text-indigo-600 mb-3">快速探索</span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">探索習慣庫</h3>
            <p className="text-sm text-gray-600 mb-4">從精心挑選的習慣中快速開始</p>
            <span className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1">
              開始探索 →
            </span>
          </div>
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="pb-24 md:pb-0">
        {loading && <div className="text-center py-10 text-gray-400">載入中...</div>}

        {!loading && activeTasks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              🌵
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">還沒有習慣</h3>
            <p className="text-gray-500 mb-6">開始建立你的第一個習慣，或是探索專家計畫</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onOpenTemplateExplorer}
                className="text-emerald-500 font-bold hover:underline"
              >
                探索計畫
              </button>
              <button onClick={onTaskClick} className="text-indigo-500 font-bold hover:underline">
                建立習慣
              </button>
            </div>
          </div>
        )}

        {!loading && activeTasks.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-gray-800 px-4 mb-4">我的任務總覽</h3>
            <div className="grid grid-cols-2 gap-2 px-4">
              {activeTasks.map(task => (
                <HabitCalendarCard
                  key={task.id}
                  task={task}
                  year={year}
                  month={month}
                  todayStr={todayStr}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageView;
