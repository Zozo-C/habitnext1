'use client';

import React, { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import QuizSelectionScreen from './screens/QuizSelectionScreen';
import QuizScreen from './screens/QuizScreen';
import CompletionScreen from './screens/CompletionScreen';

/**
 * Onboarding 主流程組件
 *
 * 流程：
 * 1. 歡迎 & 名字設定
 * 2. 問卷頁面（多個問題 + 進度條）
 * 3. 問卷選擇（睡眠、花朵、先逛逛）
 * 4. 完成頁面
 */
const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState('welcome'); // welcome, quiz, quizSelection, completion
  const [userInfo, setUserInfo] = useState({
    name: '',
    initialQuizAnswers: {}, // 初始問卷的答案
    selectedQuiz: null, // 'sleep', 'flower', null
    selectedQuizAnswers: {},
  });

  const handleWelcomeComplete = (name) => {
    setUserInfo(prev => ({ ...prev, name }));
    setStep('quiz'); // 進入初始問卷
  };

  const handleInitialQuizComplete = (answers) => {
    setUserInfo(prev => ({ ...prev, initialQuizAnswers: answers }));
    setStep('quizSelection'); // 進入問卷選擇
  };

  const handleQuizSelection = (quizType) => {
    // quizType: 'sleep', 'flower', null (先逛逛)
    setUserInfo(prev => ({ ...prev, selectedQuiz: quizType }));
    // 無論選擇什麼，都直接進入完成頁面
    setStep('completion');
  };

  const handleQuizComplete = (answers) => {
    setUserInfo(prev => ({ ...prev, selectedQuizAnswers: answers }));
    setStep('completion');
  };

  const handleOnboardingComplete = () => {
    // 保存 onboarding 狀態到 localStorage
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // 觸發完成回調
    onComplete?.(userInfo);
  };

  return (
    <>
      {step === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      {step === 'quiz' && (
        <QuizScreen
          quizType="initial" // 初始問卷
          onComplete={handleInitialQuizComplete}
          onBack={() => setStep('welcome')}
        />
      )}
      {step === 'quizSelection' && (
        <QuizSelectionScreen
          userName={userInfo.name}
          onSelect={handleQuizSelection}
        />
      )}
      {step === 'completion' && (
        <CompletionScreen
          userInfo={userInfo}
          onComplete={handleOnboardingComplete}
        />
      )}
    </>
  );
};

export default OnboardingFlow;
