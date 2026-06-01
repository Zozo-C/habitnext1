'use client';

import React, { useEffect, useState } from 'react';
import { Flame, X } from 'lucide-react';
import MascotImage from './MascotImage';

const StreakCelebration = ({ streak, isVisible, onClose }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShowConfetti(true);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* 彩帶背景 */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 51 }}>
                    {/* 生成 50 個彩帶 */}
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-10px`,
                                backgroundColor: ['#FFD54F', '#FF6B6B', '#4CAF50', '#2196F3', '#FF9800'][Math.floor(Math.random() * 5)],
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                                animationDelay: `${Math.random() * 0.5}s`,
                                zIndex: 1,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Modal 彈窗 */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 animate-bounce-in relative">
                    {/* 慶祝 coco 在右上角，置於卡片後方 */}
                    <div className="absolute" style={{ top: 'calc(-5.5rem - 10px)', right: '0rem', width: '9rem', height: '9rem', zIndex: -1 }}>
                        <MascotImage
                            mascot="coco_q_celebrate"
                            size="100%"
                            alt="celebrating coco"
                            className="w-full h-full"
                        />
                    </div>

                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="text-5xl">🎉</div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#1A1A1A]">太棒了！</h2>
                                <p className="text-sm text-gray-500">今日首個任務完成</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Flame size={32} className="text-orange-500" />
                            <span className="text-5xl font-bold text-orange-600">{streak}</span>
                        </div>
                        <p className="text-center text-orange-700 font-semibold">
                            連續紀錄 {streak} 天！
                        </p>
                    </div>

                    <p className="text-center text-gray-600 mb-6">
                        繼續保持每日完成習慣，越來越接近目標！
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-[#169E6B] to-[#00D084] text-white font-bold py-3 rounded-xl hover:from-[#00B86D] hover:to-[#00C876] transition-all active:scale-95"
                    >
                        繼續加油 💪
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes confetti {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                :global(.animate-confetti) {
                    animation: confetti 3s ease-in forwards;
                }
                :global(.animate-bounce-in) {
                    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    );
};

export default StreakCelebration;
