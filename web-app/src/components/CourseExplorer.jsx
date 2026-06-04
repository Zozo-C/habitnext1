'use client';

import React, { useState } from 'react';
import { X, Users } from 'lucide-react';
import { explorePlanSections } from '@/data/mockData';
import PlanDetailModal from './PlanDetailModal';

const CourseCard = ({ template, onButtonClick }) => {
  return (
    <button
      onClick={onButtonClick}
      className="flex-shrink-0 w-56 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-100/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col text-left cursor-pointer active:scale-95 hover:-translate-y-1"
    >
      {/* Color header with gradient overlay */}
      <div
        className="h-20 flex items-center justify-center text-4xl font-bold text-white relative overflow-hidden"
        style={{
          backgroundColor: template.accent,
          backgroundImage: `linear-gradient(135deg, ${template.accent} 0%, ${template.accent}dd 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white, transparent)',
        }}></div>
        <span className="relative drop-shadow-lg">{template.emoji}</span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-2">
        {/* Tag */}
        <div
          className="text-xs font-semibold mb-1 px-3 py-1.5 rounded-full inline-block w-fit text-white shadow-md"
          style={{
            backgroundColor: template.accent,
            opacity: 0.95,
          }}
        >
          {template.tag}
        </div>

        {/* Title */}
        <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">
          {template.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-2 line-clamp-2 flex-1 leading-relaxed">
          {template.description}
        </p>

        {/* Creator and count */}
        <div className="text-xs text-gray-500 space-y-1 py-2 border-t border-gray-100">
          <p className="font-medium">👤 {template.by}</p>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users size={13} className="text-gray-400" />
            <span className="font-medium">{template.count} 人已加入</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
          className="w-full mt-3 py-3 rounded-2xl font-semibold text-sm text-white transition-all duration-300 shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95"
          style={{
            backgroundColor: template.accent,
            backgroundImage: `linear-gradient(180deg, ${template.accent}ee 0%, ${template.accent} 100%)`,
          }}
        >
          查看詳情
        </button>
      </div>
    </button>
  );
};

const CourseExplorer = ({ isOpen, onClose, onJoinPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  if (!isOpen) return null;

  const handlePlanClick = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleJoinPlan = (planId, startDate) => {
    console.log('確認加入計劃:', planId, '開始日期:', startDate);
    // Call the parent handler to generate and add plan tasks
    if (onJoinPlan) {
      onJoinPlan(planId, startDate);
    }
    setSelectedPlanId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-md rounded-t-3xl md:rounded-3xl w-full md:w-[90%] max-w-4xl max-h-[90vh] flex flex-col animate-slide-up md:animate-fade-in-up shadow-2xl">
        {/* Header with subtle gradient background */}
        <div className="sticky top-0 bg-gradient-to-r from-white/90 to-white border-b border-gray-100/60 flex items-center justify-between p-4 md:p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-lg">
              ✨
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">探索課程計劃</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100/80 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="關閉"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content - Horizontal scroll sections */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8">
          <div className="space-y-10">
            {explorePlanSections.map(section => (
              <div key={section.id} className="group">
                {/* Section header */}
                <div className="mb-6 pb-2 border-b border-gray-100/60">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                    <span className="text-2xl mr-2">{section.emoji}</span>
                    {section.category}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed">{section.subtitle}</p>
                </div>

                {/* Horizontal scroll cards */}
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:-mx-6 md:px-6 no-scrollbar">
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
