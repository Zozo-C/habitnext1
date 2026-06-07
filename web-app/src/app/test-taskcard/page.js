'use client';

import TaskCard from '@/components/TaskCard';
import { mockTasks } from '@/data/mockData';
import { getTodayStr } from '@/lib/utils';

export default function TestTaskCard() {
  const todayStr = getTodayStr();

  // Get a few sample tasks to display
  const sampleTasks = mockTasks.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">任務卡片測試</h1>
        <p className="text-gray-600 mb-8">修改 TaskCard.jsx 並看即時效果</p>

        <div className="space-y-3">
          {sampleTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => console.log('clicked:', task.id)}
              onUpdate={(task, action, ...args) => console.log('update:', action, ...args)}
              viewingDate={todayStr}
              onAfterAction={() => console.log('action completed')}
              onPickLocation={() => {}}
              onAttachPhoto={() => {}}
              attachingKey={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
