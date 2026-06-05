'use client';

import React, { useState } from 'react';
import HabitCard from '@/components/explore/HabitCard';

const SAMPLE_HABIT = {
  id: 'preview-habit-1',
  name: '定期進行健康檢查',
  category: '基因與腸道',
  icon: 'activity',
  description: '預防勝於治療，年度檢查能在症狀出現前發現慢性病風險指標。',
  difficulties: {
    beginner: {
      enabled: true,
      label: '入門',
      type: 'binary',
      recurrence: {
        type: 'monthly',
        interval: 12,
        periodTarget: 1,
      },
    },
    intermediate: {
      enabled: true,
      label: '進階',
      type: 'binary',
      recurrence: {
        type: 'monthly',
        interval: 6,
        periodTarget: 1,
      },
    },
    challenge: {
      enabled: true,
      label: '挑戰',
      type: 'binary',
      recurrence: {
        type: 'monthly',
        interval: 3,
        periodTarget: 1,
      },
    },
  },
};

export default function HabitCardDesignPage() {
  const [habitData, setHabitData] = useState(SAMPLE_HABIT);
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');

  const handleUpdateHabit = (field, value) => {
    setHabitData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectDifficulty = (habitId, difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSelectHabit = (habit, difficulty) => {
    console.log('Selected habit:', habit, 'Difficulty:', difficulty);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左側：編輯器 */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">習慣卡片設計</h1>
            <p className="text-sm text-gray-500">左側編輯數據，右側實時預覽</p>
          </div>

          {/* 樣本數據編輯器 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-gray-900">卡片數據</h2>

            {/* 習慣名稱 */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                習慣名稱
              </label>
              <input
                type="text"
                value={habitData.name}
                onChange={(e) => handleUpdateHabit('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* 習慣分類 */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                分類
              </label>
              <input
                type="text"
                value={habitData.category}
                onChange={(e) => handleUpdateHabit('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* 描述 */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                描述
              </label>
              <textarea
                value={habitData.description}
                onChange={(e) => handleUpdateHabit('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* 圖標 */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                圖標鍵
              </label>
              <input
                type="text"
                value={habitData.icon}
                onChange={(e) => handleUpdateHabit('icon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* 預設難度 */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                預設難度
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="beginner">入門</option>
                <option value="intermediate">進階</option>
                <option value="challenge">挑戰</option>
              </select>
            </div>
          </div>

          {/* 狀態說明 */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-900">
            <p className="font-medium mb-1">📝 預設難度：{selectedDifficulty}</p>
            <p className="text-xs opacity-75">選擇不同難度在右側卡片預覽中查看效果</p>
          </div>
        </div>

        {/* 右側：預覽 */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">實時預覽</h2>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <HabitCard
                habit={habitData}
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={handleSelectDifficulty}
                onSelectHabit={handleSelectHabit}
              />
            </div>
          </div>

          {/* 預覽狀態說明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
            <p className="font-medium mb-1">💡 提示</p>
            <ul className="text-xs space-y-1 opacity-75">
              <li>• 點擊卡片標題可展開/收縮詳情</li>
              <li>• 編輯左側數據，預覽即時更新</li>
              <li>• 選擇不同難度查看視覺反饋</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
