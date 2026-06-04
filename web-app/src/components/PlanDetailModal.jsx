'use client';

import React, { useState } from 'react';
import { X, Users, Calendar } from 'lucide-react';
import { coursePlans } from '@/data/mockData';
import StartDateModal from './StartDateModal';

const PlanDetailModal = ({ isOpen, planId, onClose, onJoin }) => {
  const [showStartDateModal, setShowStartDateModal] = useState(false);

  if (!isOpen || !planId) return null;

  const plan = coursePlans[planId];
  if (!plan) return null;

  const handleJoinClick = () => {
    setShowStartDateModal(true);
  };

  const handleConfirmDate = (startDate) => {
    console.log('確認加入計劃:', planId, '開始日期:', startDate);
    setShowStartDateModal(false);
    onJoin(planId, startDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:w-[90%] max-w-2xl max-h-[90vh] flex flex-col animate-slide-up md:animate-fade-in-up overflow-hidden">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 flex items-center justify-between p-6">
          <h2 className="text-xl font-bold text-gray-800">{plan.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="關閉"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{plan.duration}</div>
              <div className="text-xs text-gray-500">天課程</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{plan.totalTasks}</div>
              <div className="text-xs text-gray-500">個任務</div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Users size={16} className="text-gray-500" />
              <div>
                <div className="text-2xl font-bold text-gray-800">{plan.participants}</div>
                <div className="text-xs text-gray-500">人參加</div>
              </div>
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-4">
            {plan.stages.map((stage, index) => (
              <div key={stage.id} className="bg-gray-50 rounded-xl p-4">
                {/* Stage Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                    {stage.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{stage.name}</h3>
                    <p className="text-xs text-gray-500">{stage.duration} 天</p>
                  </div>
                </div>

                {/* Tasks */}
                <div className="space-y-2 pl-11">
                  {stage.tasks.map((task, taskIndex) => (
                    <div key={task.id} className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {taskIndex + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{task.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Join Button */}
        <div className="border-t border-gray-100 p-6 bg-white">
          <button
            onClick={handleJoinClick}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calendar size={18} />
            加入計劃
          </button>
        </div>

        {/* Start Date Modal */}
        <StartDateModal
          isOpen={showStartDateModal}
          planName={plan.name}
          onClose={() => setShowStartDateModal(false)}
          onConfirm={handleConfirmDate}
        />
      </div>
    </div>
  );
};

export default PlanDetailModal;
