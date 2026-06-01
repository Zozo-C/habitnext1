'use client';

import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import MascotImage from '@/components/MascotImage';

/**
 * 問卷屏 - 顯示多個問題 + 進度條
 * 示例問題（可根據需要替換）
 */
const QuizScreen = ({ quizType, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 示例問題 - 可根據實際問卷替換
  const questions =
    quizType === 'initial'
      ? [
          {
            id: 'intro_1',
            text: '你對自己了解多少呢？',
            emoji: '🤔',
            options: [
              { label: '非常了解', value: 'very_well' },
              { label: '還算了解', value: 'somewhat' },
              { label: '不太了解', value: 'not_much' },
              { label: '完全陌生', value: 'unknown' },
            ],
          },
          {
            id: 'intro_2',
            text: '你想要改變什麼？',
            emoji: '✨',
            options: [
              { label: '健康習慣', value: 'health' },
              { label: '工作效率', value: 'productivity' },
              { label: '生活品質', value: 'lifestyle' },
              { label: '心理健康', value: 'mental' },
            ],
          },
          {
            id: 'intro_3',
            text: '你的動力來自哪裡？',
            emoji: '💪',
            options: [
              { label: '自我提升', value: 'self_improvement' },
              { label: '身體健康', value: 'physical_health' },
              { label: '心理平衡', value: 'mental_balance' },
              { label: '達成目標', value: 'goal_achievement' },
            ],
          },
        ]
      : quizType === 'sleep'
      ? [
          {
            id: 'sleep_duration',
            text: '每天睡多久呢？',
            emoji: '😴',
            options: [
              { label: '6小時以下', value: '6h_below' },
              { label: '6～8小時', value: '6-8h' },
              { label: '8～10小時', value: '8-10h' },
              { label: '10小時以上', value: '10h_above' },
            ],
          },
          {
            id: 'sleep_routine',
            text: '起床和就寢時間規律嗎？',
            emoji: '⏰',
            options: [
              { label: '是的，大致規律', value: 'yes' },
              { label: '視情況而定', value: 'sometimes' },
              { label: '不規律', value: 'no' },
            ],
          },
          {
            id: 'daily_routine',
            text: '每天的行程規律嗎？',
            emoji: '📅',
            options: [
              { label: '很規律', value: 'very_regular' },
              { label: '具彈性', value: 'flexible' },
              { label: '不規律', value: 'irregular' },
            ],
          },
          {
            id: 'recent_state',
            text: '最近的狀態如何呢？',
            emoji: '😊',
            options: [
              { label: '每天精力充沛！', value: 'energetic' },
              { label: '普通', value: 'normal' },
              { label: '做什麼都提不起勁', value: 'tired' },
            ],
          },
        ]
      : [
          {
            id: 'flower_q1',
            text: '你對健康保健感興趣嗎？',
            emoji: '🌸',
            options: [
              { label: '非常感興趣', value: 'very' },
              { label: '有點感興趣', value: 'some' },
              { label: '不太感興趣', value: 'not_much' },
            ],
          },
          {
            id: 'flower_q2',
            text: '你的知識水平如何？',
            emoji: '📚',
            options: [
              { label: '初級', value: 'beginner' },
              { label: '中級', value: 'intermediate' },
              { label: '進階', value: 'advanced' },
            ],
          },
          {
            id: 'flower_q3',
            text: '你想學習什麼內容？',
            emoji: '🎯',
            options: [
              { label: '生理健康', value: 'physical' },
              { label: '心理健康', value: 'mental' },
              { label: '兩者都有', value: 'both' },
            ],
          },
        ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelectOption = (value) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 完成問卷
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack?.();
    }
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];
  const isAnswered = selectedAnswer !== undefined;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-green-50 to-white overflow-y-auto">
      <div className="min-h-screen flex flex-col px-6 py-8">
        {/* 返回按鈕 */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBack}
            disabled={isSubmitting}
            className="p-2 -m-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="text-sm font-semibold text-gray-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* 進度條 */}
        <div className="w-full max-w-md mx-auto mb-12">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#169E6B] to-[#00D084] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 吉祥物 */}
        <div className="flex justify-center mb-8">
          <div style={{ width: '5rem', height: '5rem' }}>
            <MascotImage
              mascot="coco_q_smile"
              size="100%"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* 問題 */}
        <div className="w-full max-w-md mx-auto mb-8 flex-1">
          <div className="text-center mb-8">
            <span className="text-5xl">{currentQ.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-4 leading-tight">
              {currentQ.text}
            </h2>
          </div>

          {/* 選項 */}
          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                disabled={isSubmitting}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedAnswer === option.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-300'
                } ${isSubmitting ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">
                    {option.label}
                  </span>
                  {selectedAnswer === option.value && (
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
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 下一步按鈕 */}
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={!isAnswered || isSubmitting}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isAnswered && !isSubmitting
                ? 'bg-gradient-to-r from-[#169E6B] to-[#00D084] text-white hover:shadow-lg active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : currentQuestion === questions.length - 1 ? (
              <>
                完成
                <ChevronRight size={20} />
              </>
            ) : (
              <>
                下一題
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
