"use client";
import { Sun, Grid, BarChart3, Award, Map } from 'lucide-react';

const TABS = [
    { view: 'daily', icon: Sun, label: '今日' },
    { view: 'manage', icon: Grid, label: '計畫' },
    { view: 'dashboard_detail', icon: BarChart3, label: '詳情' },
    { view: 'stats', icon: BarChart3, label: '統計' },
    { view: 'badges', icon: Award, label: '成就' },
    { view: 'journey', icon: Map, label: '旅程' },
];

const BottomTabBar = ({ currentView, onViewChange }) => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#D1D4D9] shadow-md">
        <div className="flex items-center justify-around px-2 pb-safe">
            {TABS.map(({ view, icon: Icon, label }) => {
                const isActive = currentView === view;
                return (
                    <button
                        key={view}
                        type="button"
                        onClick={() => onViewChange(view)}
                        className="flex flex-col items-center py-3 px-3 min-w-[56px] active:scale-95 transition-all"
                    >
                        <Icon
                            size={24}
                            className={isActive ? 'text-[#169E6B]' : 'text-[#9CA3AF]'}
                        />
                        <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#169E6B]' : 'text-[#9CA3AF]'}`}>
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    </nav>
);

export default BottomTabBar;
