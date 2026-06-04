'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import WeekStrip from '../WeekStrip';
import TaskCard from '../TaskCard';
import DashboardSummaryCard from '../DashboardSummaryCard';
import RecommendationCardRow from '../RecommendationCardRow';

const DailyView = (props) => {
  const { tasks, selectedDate, onSelectDate, user, isMenstrualMode, completedExpanded, showRecommendationCards,
    candidateCount, bannerDismissed, onToggleMenstrual, onUpdateProgress, onOpenDetail, onOpenTemplateExplorer,
    onDismissRecommendations, onSetBannerDismissed, onSetCompletedExpanded, onOpenFocusMap, onPickLocation,
    onAttachPhoto, attachingKey, incompleteDailyTasks, completedDailyTasks, flexibleTasks, dailyTasks,
    isSelectedToday, dailySectionLabel, todayStr, menstrualExpired, exitingTaskIds, fetchTasks, onTaskDetailClick } = props;

  const renderTaskCard = (task, onUpdate) => (
    <TaskCard task={task} viewingDate={selectedDate} onClick={onTaskDetailClick} onUpdate={onUpdate}
      onAfterAction={() => user?.id && fetchTasks(user.id)} onPickLocation={onPickLocation}
      onAttachPhoto={onAttachPhoto} attachingKey={attachingKey} />
  );

  return (
    <div className="animate-fade-in-up">
      <div className="hidden md:block mb-4 bg-transparent rounded-2xl border border-gray-100 shadow-sm overflow-visible">
        <WeekStrip selectedDate={selectedDate} onSelectDate={onSelectDate} tasks={tasks} className="px-3 py-1" />
      </div>

      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <span className="text-sm text-gray-600">
          {isMenstrualMode ? (menstrualExpired ? '生理期模式（超過 5 天）' : '生理期模式進行中') : '生理期模式'}
        </span>
        <button
          type="button"
          onClick={() => onToggleMenstrual(!isMenstrualMode)}
          className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
            isMenstrualMode ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isMenstrualMode ? '結束生理期' : '我正在生理期'}
        </button>
      </div>

      {showRecommendationCards && (
        <RecommendationCardRow onOpenTemplateExplorer={onOpenTemplateExplorer} onDismiss={onDismissRecommendations} />
      )}

      {isSelectedToday && candidateCount >= 5 && !bannerDismissed && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs font-bold text-amber-700">✨ 你有 {candidateCount} 個候選習慣</p>
              <p className="text-sm font-black text-gray-800 mt-1">開始焦點地圖，挑出黃金行為</p>
              <p className="text-[11px] text-gray-500 mt-1">Fogg 建議篩 3 個實際開始</p>
            </div>
            <button
              type="button"
              onClick={() => onSetBannerDismissed(true)}
              className="p-1 -mr-1 text-gray-400 hover:text-gray-600 text-lg leading-none"
              aria-label="暫時隱藏"
            >
              ×
            </button>
          </div>
          <button
            type="button"
            onClick={onOpenFocusMap}
            className="mt-3 w-full px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-colors"
          >
            開始評分 →
          </button>
        </div>
      )}

      {isSelectedToday && <DashboardSummaryCard tasks={tasks} onOpenDetail={onOpenDetail} />}

      {!isSelectedToday && (
        <div className="mb-4 flex items-center justify-between gap-2 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3">
          <p className="text-xs text-indigo-700">正在預覽 <span className="font-bold">{dailySectionLabel}</span></p>
          <button
            type="button"
            onClick={() => onSelectDate(todayStr)}
            className="text-xs font-bold px-3 py-1 rounded-full bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            回到今天
          </button>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>{dailySectionLabel}
          </h3>
          <div className="space-y-3">
            {incompleteDailyTasks.map(task => {
              const isExiting = exitingTaskIds.has(task.id);
              return (
                <div
                  key={task.id}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isExiting ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[640px] opacity-100'
                  }`}
                >
                  {renderTaskCard(task, onUpdateProgress)}
                </div>
              );
            })}

            {completedDailyTasks.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => onSetCompletedExpanded(!completedExpanded)}
                  aria-expanded={completedExpanded}
                  className="w-full flex items-center gap-3 py-2 px-2 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="flex-1 h-px bg-gray-200" />
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    已完成 {completedDailyTasks.length} 個
                    {completedExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                  <span className="flex-1 h-px bg-gray-200" />
                </button>
                {completedExpanded && completedDailyTasks.map(task => (
                  <div key={task.id}>{renderTaskCard(task, onUpdateProgress)}</div>
                ))}
              </>
            )}

            {dailyTasks.length === 0 && (
              <p className="text-gray-400 text-sm">{isSelectedToday ? '今日無固定行程。' : '這天沒有安排任務。'}</p>
            )}
          </div>
        </div>

        {isSelectedToday && flexibleTasks.length > 0 && (
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-500 rounded-full"></span>週期目標 (彈性)
            </h3>
            <div className="space-y-3">
              {flexibleTasks.map(task => (
                <div key={task.id}>{renderTaskCard(task, onUpdateProgress)}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyView;
