'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import MascotImage from '@/components/MascotImage';

/**
 * 完成屏 - 顯示總結 + 進入主應用按鈕
 */
const CompletionScreen = ({ userInfo, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onComplete();
  };

  const getCompletionMessage = () => {
    if (userInfo.selectedQuiz === 'sleep') {
      return '你已完成睡眠處方問卷！根據你的答案，我們已經為你準備了一些建議。';
    } else if (userInfo.selectedQuiz === 'flower') {
      return '你已完成花朵型課程！讓我們一起開始這段健康之旅吧。';
    } else {
      return '歡迎加入 HabitNext！讓我們一起開始建立美好的日常習慣。';
    }
  };

  const getMascotVariant = () => {
    if (userInfo.selectedQuiz === 'sleep') {
      return 'coco_q_r';
    }
    return 'coco_q_celebrate';
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-white overflow-y-auto">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* 吉祥物 */}
        <div className="mb-8 flex items-center justify-center h-40">
          <div style={{ width: '9rem', height: '9rem' }}>
            <MascotImage
              mascot={getMascotVariant()}
              size="100%"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 標題文案 */}
        <div className="text-center mb-8 max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            準備好了！
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            {getCompletionMessage()}
          </p>
        </div>

        {/* 用戶信息總結 */}
        <div className="w-full max-w-md mb-12 bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">用戶名稱</span>
            <span className="font-bold text-gray-900">{userInfo.name}</span>
          </div>

          {userInfo.selectedQuiz && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">選擇問卷</span>
              <span className="font-bold text-gray-900">
                {userInfo.selectedQuiz === 'sleep'
                  ? '睡眠處方'
                  : '花朵型課程'}
              </span>
            </div>
          )}

          {userInfo.initialQuizAnswers &&
            Object.keys(userInfo.initialQuizAnswers).length > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">初始問卷</span>
                <span className="font-bold text-green-600">✓ 已完成</span>
              </div>
            )}
        </div>

        {/* 提交按鈕 */}
        <button
          onClick={handleComplete}
          disabled={isSubmitting}
          className={`w-full max-w-md py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            !isSubmitting
              ? 'bg-gradient-to-r from-[#169E6B] to-[#00D084] text-white hover:shadow-lg active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              進入應用
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* 底部裝飾 */}
        <div className="mt-16 text-center text-sm text-gray-400">
          讓每一天都成為更好的自己 🌟
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
