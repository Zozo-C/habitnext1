"use client";
import { Sun, Calendar, Target, Grid, Award, BarChart3, BookOpen } from 'lucide-react';
import Avatar from './Avatar';

const NAV_ITEMS = [
    { view: 'daily', icon: Sun, label: '今日' },
    { view: 'manage', icon: Grid, label: '計畫總覽' },
    { view: 'dashboard_detail', icon: Calendar, label: '日曆' },
    { view: 'stats', icon: BarChart3, label: '統計' },
    { view: 'badges', icon: Award, label: '成就' },
];

const SidebarNavigation = ({ user, currentView, onViewChange, onOpenTemplateExplorer, onOpenFormModal, onOpenProfile }) => (
    <aside className="hidden md:flex w-64 bg-white flex-col border-r border-warm-border">
        <div className="bg-brand-dark p-8 pb-6">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                    <Target className="text-white" size={20} />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">HabitNext</h1>
            </div>
        </div>
        <div className="p-6 pb-4">

            <button
                onClick={onOpenTemplateExplorer}
                className="w-full bg-brand-green text-white p-3.5 rounded-xl font-semibold hover:opacity-90 active:opacity-80 active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
            >
                <BookOpen size={18} />
                探索計畫
            </button>
            <button
                onClick={onOpenFormModal}
                className="w-full bg-surface text-brand-dark border border-warm-border p-3.5 rounded-xl font-semibold hover:bg-warm-border active:opacity-70 transition-all flex items-center justify-center gap-2"
            >
                <span className="text-lg leading-none">+</span>
                建立習慣
            </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2">
            {NAV_ITEMS.map(({ view, icon: Icon, label }) => (
                <button
                    key={view}
                    onClick={() => onViewChange(view)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors active:scale-95 ${
                        currentView === view
                            ? 'bg-brand-green/10 text-brand-dark font-semibold'
                            : 'text-gray-500 hover:bg-surface hover:text-brand-dark'
                    }`}
                >
                    <Icon size={20} />
                    {label}
                </button>
            ))}
        </nav>

        <div className="p-4 border-t border-warm-border">
            <button
                onClick={onOpenProfile}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-warm-border active:opacity-70 transition-colors text-left"
            >
                <Avatar user={user} size="w-8 h-8" />
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{user?.nickname || '使用者'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.phone || user?.email || ''}</p>
                </div>
            </button>
        </div>
    </aside>
);

export default SidebarNavigation;
