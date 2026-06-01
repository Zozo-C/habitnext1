'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import MascotImage from '@/components/MascotImage';

/**
 * 問卷選擇屏 - 選擇問卷類型或先逛逛
 * 3 個選項：睡眠處方、花朵型課程、先逛逛
 */
const QuizSelectionScreen = ({ userName, onSelect }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quizzes = [
    {
      id: 'sleep',
      icon: '😴',
      title: '睡眠處方',
      description: '評估你的睡眠習慣，獲得個性化建議',
    },
    {
      id: 'flower',
      icon: '🌸',
      title: '花朵型小課程',
      description: '女性保健與健康提升課程',
    },
    {
      id: 'skip',
      icon: '👀',
      title: '先逛逛',
      description: '稍後再決定，先探索應用',
    },
  ];

  const handleSelect = async (quizId) => {
    setSelectedQuiz(quizId);
    setIsSubmitting(true);

    // 模擬延遲
    await new Promise(resolve => setTimeout(resolve, 300));

    // 將 'skip' 轉換為 null
    const result = quizId === 'skip' ? null : quizId;
    onSelect(result);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-white overflow-y-auto">
      <div className="min-h-screen flex flex-col px-6 py-8">
        {/* 頂部吉祥物 */}
        <div className="flex justify-center mb-8 mt-4">
          <div style={{ width: '6rem', height: '6rem' }}>
            <MascotImage
              mascot="coco_q_r"
              size="100%"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 標題 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {userName}，很高興認識你！
          </h2>
          <p className="text-gray-600">
            選擇一份問卷，幫助我們了解你更多
          </p>
        </div>

        {/* 進度條 */}
        <div className="w-full max-w-md mx-auto mb-12">
          <div className="flex items-center gap-1">
            <div className="flex-1 h-1 bg-green-500 rounded-full" />
            <div className="flex-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex-1 h-1 bg-gray-300 rounded-full" />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">2/3</p>
        </div>

        {/* 問卷選項 */}
        <div className="w-full max-w-md mx-auto space-y-3 mb-8 flex-1">
          {quizzes.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => handleSelect(quiz.id)}
              disabled={isSubmitting}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                selectedQuiz === quiz.id
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-green-300'
              } ${isSubmitting && selectedQuiz !== quiz.id ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-3xl flex-shrink-0">{quiz.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base">
                      {quiz.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {quiz.description}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {selectedQuiz === quiz.id ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 提交按鈕 */}
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={() => handleSelect(selectedQuiz || 'skip')}
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-[#169E6B] to-[#00D084] text-white hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              '繼續'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSelectionScreen;
