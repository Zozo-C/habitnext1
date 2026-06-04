'use client';

import React, { useState } from 'react';
import { X, Users } from 'lucide-react';
import { explorePlanSections } from '@/data/mockData';
import PlanDetailModal from './PlanDetailModal';

const CourseCard = ({ template, onButtonClick }) => {
  return (
    <button
      onClick={onButtonClick}
      className="flex-shrink-0 w-56 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col text-left cursor-pointer active:scale-95"
    >
      {/* Color header */}
      <div
        className="h-16 flex items-center justify-center text-2xl font-bold text-white"
        style={{ backgroundColor: template.accent }}
      >
        {template.emoji}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div
          className="text-xs font-bold mb-2 px-2 py-1 rounded-full inline-block w-fit text-white"
          style={{ backgroundColor: template.accent }}
        >
          {template.tag}
        </div>
        <h4 className="font-bold text-sm text-gray-800 mb-1 line-clamp-2">
          {template.name}
        </h4>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">
          {template.description}
        </p>

        {/* Creator and count */}
        <div className="text-xs text-gray-500 mb-3">
          <p className="mb-1">👤 {template.by}</p>
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{template.count} 人已加入</span>
          </div>
        </div>

        {/* Button */}
        <div
          className="w-full py-2 rounded-lg font-semibold text-sm text-white transition-all"
          style={{ backgroundColor: template.accent }}
        >
          查看詳情
        </div>
      </div>
    </button>
  );
};

const CourseExplorer = ({ isOpen, onClose }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  if (!isOpen) return null;

  const handlePlanClick = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleJoinPlan = (planId) => {
    console.log('加入計劃:', planId);
    setSelectedPlanId(null);
    // TODO: 打開開始日期選擇對話框
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:w-[90%] max-w-4xl max-h-[90vh] flex flex-col animate-slide-up md:animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 flex items-center justify-between p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">探索課程計劃</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="關閉"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Horizontal scroll sections */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="space-y-8">
            {explorePlanSections.map(section => (
              <div key={section.id}>
                {/* Section header */}
                <div className="mb-4">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">
                    {section.emoji} {section.category}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">{section.subtitle}</p>
                </div>

                {/* Horizontal scroll cards */}
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:-mx-6 md:px-6 no-scrollbar">
                  {section.templates.map(template => (
                    <CourseCard
                      key={template.id}
                      template={template}
                      onButtonClick={() => handlePlanClick(template.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Detail Modal */}
      <PlanDetailModal
        isOpen={!!selectedPlanId}
        planId={selectedPlanId}
        onClose={() => setSelectedPlanId(null)}
        onJoin={handleJoinPlan}
      />
    </div>
  );
};

export default CourseExplorer;
