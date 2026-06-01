'use client';

import CourseCard from './CourseCard';

const RecommendationCardRow = ({ onOpenTemplateExplorer, onDismiss }) => {
    // 總是顯示卡片，模擬未填寫問卷的狀態
    const showFlower = true;
    const showSleep = true;

    if (!showFlower && !showSleep) return null;

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">為你準備</p>
                <button
                    type="button"
                    onClick={onDismiss}
                    className="text-gray-400 hover:text-gray-500 text-lg leading-none transition-colors"
                >
                    ×
                </button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {showFlower && (
                    <div className="flex-none w-72">
                        <CourseCard
                            themeColor="#FF6B6B"
                            tag="花朵型"
                            title="花朵型小課程"
                            description="依女性週期身體狀態分型，14 天分階段任務，跟著週期長出新習慣"
                            buttonText="填寫問卷"
                            imageUrl="/images/course-flower.svg"
                            onButtonClick={onOpenTemplateExplorer}
                        />
                    </div>
                )}
                {showSleep && (
                    <div className="flex-none w-72">
                        <CourseCard
                            themeColor="#169E6B"
                            tag="睡眠處方"
                            title="睡眠處方小課程"
                            description="評估睡眠習慣，個性化睡眠優化方案，14 天改善睡眠品質"
                            buttonText="填寫問卷"
                            imageUrl="/images/course-sleep.svg"
                            onButtonClick={onOpenTemplateExplorer}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationCardRow;
