"use client";
import { USER_TYPE_PROFILES } from '@/lib/typeKeys';
import { SLEEP_TYPE_PROFILES } from '@/lib/sleepTypeKeys';

const RecommendationCardRow = ({ user, hasJoinedFlowerTemplate, hasJoinedSleepTemplate, onOpenTemplateExplorer, onDismiss }) => {
    const showFlower = user?.typeKey && USER_TYPE_PROFILES[user.typeKey] && !hasJoinedFlowerTemplate;
    const showSleep = user?.sleepTypeKey && SLEEP_TYPE_PROFILES[user.sleepTypeKey] && !hasJoinedSleepTemplate;

    if (!showFlower && !showSleep) return null;

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">為你準備</p>
                <button type="button" onClick={onDismiss} className="text-[#9CA3AF] hover:text-[#6B7280] text-lg leading-none transition-colors duration-200">×</button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {showFlower && (
                    <div className="flex-none w-64 bg-white rounded-2xl p-4 shadow-sm">
                        <p className="text-xs font-medium text-[#169E6B] uppercase tracking-wider mb-1">小課程</p>
                        <h3 className="text-sm font-bold text-[#1A1A1A] mb-1">{USER_TYPE_PROFILES[user.typeKey].label}小課程</h3>
                        <p className="text-xs text-[#6B7280] mb-3">根據你的問卷結果量身打造</p>
                        <button
                            type="button"
                            onClick={onOpenTemplateExplorer}
                            className="w-full py-2 rounded-full bg-[#169E6B] text-white text-xs font-medium hover:bg-[#128E5F] active:bg-[#0F7750] transition-colors duration-200"
                        >查看小課程</button>
                    </div>
                )}
                {showSleep && (
                    <div className="flex-none w-64 bg-white rounded-2xl p-4 shadow-sm">
                        <p className="text-xs font-medium text-[#169E6B] uppercase tracking-wider mb-1">睡眠處方</p>
                        <h3 className="text-sm font-bold text-[#1A1A1A] mb-1">{SLEEP_TYPE_PROFILES[user.sleepTypeKey].label}睡眠處方</h3>
                        <p className="text-xs text-[#6B7280] mb-3">14 天循序漸進，從 baby step 開始</p>
                        <button
                            type="button"
                            onClick={onOpenTemplateExplorer}
                            className="w-full py-2 rounded-full bg-[#169E6B] text-white text-xs font-medium hover:bg-[#128E5F] active:bg-[#0F7750] transition-colors duration-200"
                        >查看睡眠處方</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendationCardRow;
