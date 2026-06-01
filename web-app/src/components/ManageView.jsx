"use client";
import { useState } from 'react';
import { Users } from 'lucide-react';
import MyPlansView from './MyPlansView';
import { explorePlanSections } from '@/data/mockData';

const QuizCard = ({ section, onButtonClick }) => {
    const { themeColor, tag, imageUrl } = section.quizCard;
    return (
        <div className="flex-shrink-0 w-44 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white flex flex-col">
            <div className="h-40 relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: themeColor + '22' }}>
                <img src={imageUrl} alt={tag} className="h-full w-full object-cover opacity-80" />
            </div>
            <div className="p-3 flex flex-col flex-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full self-start mb-2 text-white" style={{ backgroundColor: themeColor }}>
                    {tag}
                </span>
                <p className="text-sm font-bold text-[#1A1A1A] leading-snug mb-1">還不知道自己是哪種型嗎？</p>
                <p className="text-xs text-gray-400 flex-1">填寫問卷獲得結果</p>
                <button
                    type="button"
                    onClick={onButtonClick}
                    className="mt-3 w-full text-xs font-semibold py-1.5 rounded-lg text-white transition-all active:opacity-70"
                    style={{ backgroundColor: themeColor }}
                >
                    填寫問卷
                </button>
            </div>
        </div>
    );
};

const TemplateCard = ({ t, onOpenTemplateExplorer }) => (
    <div className="flex-shrink-0 w-44 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white flex flex-col">
        {/* 頂部色塊 */}
        <div className="h-20 flex items-center justify-center text-3xl" style={{ backgroundColor: t.color }}>
            {t.emoji}
        </div>
        <div className="p-3 flex flex-col flex-1">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full self-start mb-2" style={{ backgroundColor: t.color, color: t.accent }}>
                {t.tag}
            </span>
            <p className="text-sm font-bold text-[#1A1A1A] leading-snug mb-0.5">{t.name}</p>
            <p className="text-[10px] text-gray-400 mb-2">by {t.by}</p>
            <p className="text-xs text-gray-500 line-clamp-3 flex-1">{t.description}</p>
            <div className="flex items-center gap-1 mt-2 mb-3">
                <Users size={11} className="text-gray-400" />
                <span className="text-[10px] text-gray-400">{t.count} 人</span>
            </div>
            <div className="flex gap-1.5">
                <button
                    type="button"
                    onClick={onOpenTemplateExplorer}
                    className="flex-1 text-xs font-semibold py-1.5 rounded-lg text-white transition-all active:opacity-70"
                    style={{ backgroundColor: t.accent }}
                >
                    加入計畫
                </button>
                <button
                    type="button"
                    onClick={onOpenTemplateExplorer}
                    className="flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-all active:opacity-70"
                    style={{ color: t.accent, borderColor: t.accent }}
                >
                    詳情
                </button>
            </div>
        </div>
    </div>
);

const ManageView = ({
    tasks, groupedTasks, soloTasks, loading,
    onTaskClick, onTaskDelete, onDeleteAssignment, onUpdateProgress,
    onOpenTemplateExplorer, onOpenFormModal,
}) => {
    const [activeTab, setActiveTab] = useState('mine');

    return (
        <div className="p-4">
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
                {[['mine', '我的計劃'], ['explore', '探索計劃']].map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setActiveTab(key)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
                            activeTab === key ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {activeTab === 'mine' && (
                <MyPlansView
                    tasks={tasks}
                    groupedTasks={groupedTasks}
                    soloTasks={soloTasks}
                    loading={loading}
                    onTaskClick={onTaskClick}
                />
            )}

            {activeTab === 'explore' && (
                <div className="space-y-8 pb-24 md:pb-0">
                    {explorePlanSections.map(section => (
                        <div key={section.id}>
                            <div className="mb-1">
                                <h3 className="text-base font-bold text-[#1A1A1A]">{section.emoji} {section.category}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">{section.subtitle}</p>
                            </div>
                            <div className="flex gap-3 overflow-x-auto no-scrollbar pt-3 pb-1 -mx-4 px-4">
                                <QuizCard section={section} onButtonClick={onOpenTemplateExplorer} />
                                {section.templates.map(t => (
                                    <TemplateCard key={t.id} t={t} onOpenTemplateExplorer={onOpenTemplateExplorer} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageView;
