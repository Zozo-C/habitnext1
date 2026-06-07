'use client';

import TaskCardDesign from '@/components/TaskCardDesign';
import { mockTasks } from '@/data/mockData';
import { getTodayStr } from '@/lib/utils';

export default function DesignPage() {
  const todayStr = getTodayStr();

  // 不同類型的任務示例
  const sampleTasks = [
    mockTasks.find(t => t.type === 'binary'),
    mockTasks.find(t => t.type === 'quantitative'),
    mockTasks.find(t => t.type === 'checklist'),
    mockTasks.find(t => t.recurrence?.mode === 'period_count'),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskCard 設計編輯</h1>
          <p className="text-gray-600">修改 src/components/TaskCard.jsx 來調整設計</p>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8">
          <p className="text-sm text-blue-900">
            💡 修改 TaskCard.jsx 的 className（特別是 cardBody 的外層 div）後，此頁面會自動刷新顯示新設計
          </p>
        </div>

        {/* Task Cards Showcase */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 任務卡片示例</h2>

          {sampleTasks.map((task, idx) => (
            <div key={idx} className="group">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                {task.type === 'binary' && '📌 二進制任務'}
                {task.type === 'quantitative' && '📊 計量任務'}
                {task.type === 'checklist' && '✅ 檢查清單'}
                {task.recurrence?.mode === 'period_count' && '🎯 週期目標'}
              </p>
              <TaskCardDesign
                task={task}
                onClick={() => console.log('clicked:', task.id)}
                onUpdate={(task, action, ...args) => console.log('update:', action, ...args)}
                viewingDate={todayStr}
              />
            </div>
          ))}
        </div>

        {/* Edit Tips */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-900 mb-3">🎨 設計調整建議</h3>
          <ul className="text-sm text-amber-800 space-y-2">
            <li>• 圓角：改 <code className="bg-white px-1.5 py-0.5 rounded font-mono">rounded-3xl</code></li>
            <li>• 邊框：改 <code className="bg-white px-1.5 py-0.5 rounded font-mono">border-gray-200/50</code></li>
            <li>• 陰影：改 <code className="bg-white px-1.5 py-0.5 rounded font-mono">shadow-lg</code></li>
            <li>• 內邊距：改 <code className="bg-white px-1.5 py-0.5 rounded font-mono">px-5 py-4</code></li>
            <li>• 背景：改 <code className="bg-white px-1.5 py-0.5 rounded font-mono">bg-white</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
