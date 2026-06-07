import React, { useMemo } from 'react';
import { Calendar, X } from 'lucide-react';
import Avatar from './Avatar';
import WeekStrip from './WeekStrip';

const WEEK_DAY_LABELS = ['一', '二', '三', '四', '五', '六', '日']; // Mon..Sun

const AppHeader = ({
    onViewChange,
    currentView,
    user,
    onOpenProfile,
    className,
    // Date navigation — pass from MainApp so daily view can browse past/future
    selectedDate,
    onSelectDate,
    // Tasks for WeekStrip completion status
    tasks = [],
}) => {
    const headerDateLabel = useMemo(() => {
        if (!selectedDate) return '';
        const d = new Date(selectedDate);
        if (isNaN(d.getTime())) return '';
        const m = d.getMonth() + 1;
        const day = d.getDate();
        const wd = WEEK_DAY_LABELS[(d.getDay() + 6) % 7];
        return `${m}/${day} (${wd})`;
    }, [selectedDate]);

    return (
        <div className={`sticky top-0 z-30 ${className || ''}`}>
            <div className="flex items-center justify-between px-4 py-3">
                {currentView === 'daily' ? (
                    // Daily view: show greeting + username on left
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-sm md:text-base">
                            Hi! {user?.nickname || user?.name || '訪客'}
                        </span>
                    </div>
                ) : (
                    // Other views: show view title on left
                    <span className="font-bold text-emerald-600">
                        {currentView === 'manage' ? '計畫'
                            : currentView === 'dashboard_detail' ? '洞察報告'
                            : currentView === 'stats' ? '統計'
                            : currentView === 'journey' ? '旅程'
                            : '成就中心'}
                    </span>
                )}

                {/* Right side: calendar icon + avatar (always visible) */}
                <div className="flex items-center gap-3">
                    {currentView === 'daily' && (
                        <button
                            onClick={() => onViewChange('dashboard_detail')}
                            className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-100 transition-colors"
                            aria-label="打開日曆"
                        >
                            <Calendar size={20} />
                        </button>
                    )}
                    {currentView !== 'daily' && (
                        <button
                            onClick={() => onViewChange('daily')}
                            className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-100 transition-colors"
                            aria-label="返回今日"
                        >
                            <Calendar size={20} />
                        </button>
                    )}
                    <button
                        onClick={onOpenProfile}
                        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                        aria-label="開啟個人資料"
                    >
                        <Avatar user={user} size="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* Interactive Week Strip — extracted to WeekStrip so the desktop
                daily view (which hides this whole AppHeader) can render the
                same control. Tap a day to view it; swipe (mobile) or the
                chevrons (desktop) shift the week ±7 days. */}
            {currentView === 'daily' && (
                <WeekStrip
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                    tasks={tasks}
                    className="px-1 md:px-6 pb-0"
                />
            )}
        </div>
    );
};

export default AppHeader;
