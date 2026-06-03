"use client";

import React, { useState } from 'react';
import { Sun, Calendar, Target, BookOpen, Grid, List, Award, BarChart3 } from 'lucide-react';
import { mockTasks, achievementsData } from '@/data/mockData';

const DemoMainApp = () => {
  const [currentView, setCurrentView] = useState('daily');

  // Mock user data
  const mockUser = {
    id: 'demo-user',
    nickname: '設計測試者',
    phone: '0000000000',
    typeKey: 'daisy',
    sleepTypeKey: 'stress',
  };

  const todayStr = '2026-06-03';
  const todaysTasks = mockTasks.filter(task => task.status === 'active');

  const renderDailyView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 border border-app-border">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sun className="w-5 h-5 text-brand-green" />
          今日任務
        </h2>

        {todaysTasks.map(task => {
          const isCompleted = task.history?.[todayStr];

          return (
            <div
              key={task.id}
              className="p-3 mb-3 border border-app-border rounded-lg hover:bg-surface transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{task.cue}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.details}</p>
                    </div>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isCompleted
                      ? 'bg-green-100 text-brand-green'
                      : 'bg-surface text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {isCompleted ? '✓ 完成' : '未完成'}
                </button>
              </div>

              {task.type === 'quantitative' && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-2">
                    進度: {task.dailyProgress?.[todayStr]?.value || 0} / {task.dailyTarget}
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-brand-green h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((task.dailyProgress?.[todayStr]?.value || 0) / task.dailyTarget) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStatsView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 border border-app-border">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-green" />
          統計數據
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">完成率</p>
            <p className="text-2xl font-bold text-brand-green">72%</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">連續紀錄</p>
            <p className="text-2xl font-bold text-blue-600">12天</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">任務數</p>
            <p className="text-2xl font-bold text-purple-600">{mockTasks.length}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">成就數</p>
            <p className="text-2xl font-bold text-orange-600">{achievementsData.filter(a => a.unlocked).length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-app-border">
        <h3 className="font-semibold mb-3">本週完成狀況</h3>
        <div className="flex gap-1 items-center justify-between">
          {['一', '二', '三', '四', '五', '六', '日'].map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                idx < 5 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {idx < 5 ? '✓' : '-'}
              </div>
              <span className="text-xs text-gray-600">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievementsView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 border border-app-border">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-green" />
          成就中心
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {achievementsData.map(achievement => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all ${
                achievement.unlocked
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-2xl mb-2">{achievement.emoji}</div>
              <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
              <div className="text-xs text-gray-600">
                {achievement.progress} / {achievement.requirement}
              </div>
              {achievement.unlocked && (
                <div className="text-xs text-green-600 font-semibold mt-1">已解鎖</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-app-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">HabitNext</h1>
              <p className="text-sm text-gray-600">歡迎回來，{mockUser.nickname}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center text-sm font-bold">
              Z
            </div>
          </div>

          {/* Date Info */}
          <div className="text-sm text-gray-600">
            {new Date(todayStr).toLocaleDateString('zh-TW', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-4 pb-20">
        {currentView === 'daily' && renderDailyView()}
        {currentView === 'stats' && renderStatsView()}
        {currentView === 'achievements' && renderAchievementsView()}
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-app-border max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentView('daily')}
            className={`flex-1 py-3 px-4 flex flex-col items-center gap-1 transition-colors ${
              currentView === 'daily'
                ? 'text-brand-green'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span className="text-xs font-medium">每日</span>
          </button>

          <button
            onClick={() => setCurrentView('stats')}
            className={`flex-1 py-3 px-4 flex flex-col items-center gap-1 transition-colors ${
              currentView === 'stats'
                ? 'text-brand-green'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">統計</span>
          </button>

          <button
            onClick={() => setCurrentView('achievements')}
            className={`flex-1 py-3 px-4 flex flex-col items-center gap-1 transition-colors ${
              currentView === 'achievements'
                ? 'text-brand-green'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-xs font-medium">成就</span>
          </button>
        </div>
      </div>

      {/* Demo Badge */}
      <div className="fixed bottom-20 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
        Mock Demo 演示模式
      </div>
    </div>
  );
};

export default DemoMainApp;
