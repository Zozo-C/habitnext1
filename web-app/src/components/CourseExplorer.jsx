'use client';

import React, { useState } from 'react';
import { X, Users } from 'lucide-react';
import { explorePlanSections } from '@/data/mockData';
import PlanDetailModal from './PlanDetailModal';

const CourseCard = ({ template, onButtonClick, index = 0 }) => {
  return (
    <button
      onClick={onButtonClick}
      className="flex-shrink-0 w-56 bg-white/85 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200/50 shadow-lg md:hover:shadow-2xl transition-all duration-300 flex flex-col text-left cursor-pointer active:scale-95 md:hover:-translate-y-1 animate-slide-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Simple header with just small image */}
      <div className="h-24 flex items-center justify-center relative">
        {/* SVG Image or Emoji fallback */}
        {template.imageUrl ? (
          <img
            src={template.imageUrl}
            alt={template.name}
            className="w-14 h-14 object-contain animate-bounce-gentle drop-shadow-sm"
            onError={(e) => {
              // Fallback to emoji if SVG fails to load
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'inline';
            }}
          />
        ) : null}

        {/* Emoji fallback */}
        <span
          className="text-4xl animate-bounce-gentle"
          style={{ display: template.imageUrl ? 'none' : 'inline' }}
        >
          {template.emoji}
        </span>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 flex flex-col flex-1 gap-2">
        {/* Tag - subtle style */}
        <div
          className="text-xs font-semibold mb-2 px-3 py-1 rounded-full inline-block w-fit text-white"
          style={{
            backgroundColor: template.accent,
            opacity: 0.85,
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
        <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-100/60">
          <p className="text-gray-600">👤 {template.by}</p>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users size={12} className="text-gray-400" />
            <span>{template.count} 人已加入</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick();
          }}
          className="w-full mt-2 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 md:hover:shadow-md active:scale-95 active:opacity-90"
          style={{
            backgroundColor: template.accent,
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
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-gray-50/95 backdrop-blur-md rounded-t-3xl md:rounded-3xl w-full md:w-[90%] max-w-4xl max-h-[90vh] flex flex-col animate-slide-up md:animate-fade-in-up shadow-2xl">
        {/* Header with subtle gradient background */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-50/90 to-gray-50 border-b border-gray-200/40 flex items-center justify-between p-4 md:p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white text-lg">
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
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          <div className="space-y-8">
            {explorePlanSections.map(section => (
              <div key={section.id} className="group">
                {/* Section header */}
                <div className="mb-5 pb-3 border-b border-gray-100/50">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                    <span className="text-xl mr-2">{section.emoji}</span>
                    {section.category}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{section.subtitle}</p>
                </div>

                {/* Horizontal scroll cards */}
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:-mx-6 md:px-6 no-scrollbar">
                  {section.templates.map((template, idx) => (
                    <CourseCard
                      key={template.id}
                      template={template}
                      onButtonClick={() => handlePlanClick(template.id)}
                      index={idx}
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
