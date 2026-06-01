'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import MascotImage from '@/components/MascotImage';

/**
 * 歡迎屏 - 介紹應用 + 名字輸入
 */
const WelcomeScreen = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setIsSubmitting(true);
    // 模擬延遲
    await new Promise(resolve => setTimeout(resolve, 300));
    onComplete(name.trim());
  };

  const isValid = name.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-white overflow-y-auto">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* 吉祥物 */}
        <div className="mb-8 flex items-center justify-center h-32">
          <div style={{ width: '8rem', height: '8rem' }}>
            <MascotImage
              mascot="coco_q_celebrate"
              size="100%"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 標題文案 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            歡迎來到 HabitNext
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            每日堅持一點點，
            <br />
            就能成為更好的自己
          </p>
        </div>

        {/* 名字輸入 */}
        <div className="w-full max-w-md mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            你想被稱呼為？
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && isValid) {
                handleSubmit();
              }
            }}
            placeholder="輸入你的名字"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
          />
        </div>

        {/* 提交按鈕 */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={`w-full max-w-md py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isValid && !isSubmitting
              ? 'bg-gradient-to-r from-[#169E6B] to-[#00D084] text-white hover:shadow-lg active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              開始旅程
              <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* 底部裝飾 */}
        <div className="mt-16 text-center text-sm text-gray-400">
          讓我們一起建立美好的日常習慣 ✨
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
