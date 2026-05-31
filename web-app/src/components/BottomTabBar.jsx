"use client";
import { Sun, Grid, Plus, BarChart3, Award } from 'lucide-react';

const TABS = [
    { view: 'daily', icon: Sun, label: '今日' },
    { view: 'manage', icon: Grid, label: '計畫' },
    { view: 'add', icon: Plus, label: '建立習慣', isCenter: true },
    { view: 'stats', icon: BarChart3, label: '統計' },
    { view: 'badges', icon: Award, label: '成就' },
];

const BottomTabBar = ({ currentView, onViewChange, onOpenAddFlow }) => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#D1D4D9] shadow-md">
        <div className="flex items-end justify-around px-2 pb-safe">
            {TABS.map(({ view, icon: Icon, label, isCenter }) => {
                if (isCenter) return (
                    <button
                        key={view}
                        type="button"
                        onClick={onOpenAddFlow}
                        className="flex flex-col items-center -mt-5 mb-1"
                    >
                        <div className="w-14 h-14 bg-[#169E6B] rounded-full flex items-center justify-center shadow-lg shadow-[#169E6B]/30 hover:bg-[#128E5F] active:bg-[#0F7750] active:scale-95 transition-all duration-200">
                            <Icon size={26} className="text-white" />
                        </div>
                        <span className="text-[10px] mt-1 text-[#169E6B] font-medium">{label}</span>
                    </button>
                );

                const isActive = currentView === view;
                return (
                    <button
                        key={view}
                        type="button"
                        onClick={() => onViewChange(view)}
                        className="flex flex-col items-center py-2 px-3 min-w-[56px] active:scale-95 transition-all"
                    >
                        <Icon
                            size={22}
                            className={isActive ? 'text-[#169E6B]' : 'text-[#9CA3AF]'}
                        />
                        <span className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-[#169E6B]' : 'text-[#9CA3AF]'}`}>
                            {label}
                        </span>
                    </button>
                );
            })}
        </div>
    </nav>
);

export default BottomTabBar;
