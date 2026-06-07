'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import WeekStrip from '../WeekStrip';
import RecommendationCardRow from '../RecommendationCardRow';
import DashboardSummaryCard from '../DashboardSummaryCard';
import TaskCard from '../TaskCard';
import { getTodayStr, isTaskDueToday, isCompletedOnDate } from '@/lib/utils';
import { cueOrderFor } from '@/lib/anchors';
import { SLEEP_TYPE_PROFILES } from '@/lib/sleepTypeKeys';

const DailyView = ({
  tasks,
  selectedDate,
  onSelectDate,
  user,
  assignments,
  isMenstrualMode,
  menstrualStart,
  menstrualExpired,
  showRecommendationCards,
  candidateCount,
  bannerDismissed,
  completedExpanded,
  completingTaskIds,
  exitingTaskIds,
  onUpdateProgress,
  onToggleMenstrual,
  onOpenDetail,
  onOpenTemplateExplorer,
  onOpenLibrary,
  onDismissRecommendation,
  onDismissBanner,
  onSetCompletedExpanded,
  onTaskClick,
  onAfterAction,
  onPickLocation,
  onAttachPhoto,
  attachingKey,
}) => {
  const todayStr = getTodayStr();
  const isSelectedToday = selectedDate === todayStr;

  // Filter and sort daily tasks
  const dailyTasks = tasks
    .filter(t => isTaskDueToday(t, selectedDate))
    .filter(t => !t.status || t.status === 'active')
    .sort((a, b) => {
      const ac = isCompletedOnDate(a, selectedDate) ? 1 : 0;
      const bc = isCompletedOnDate(b, selectedDate) ? 1 : 0;
      if (ac !== bc) return ac - bc;
      const ao = cueOrderFor(a.cue);
      const bo = cueOrderFor(b.cue);
      if (ao !== bo) return ao - bo;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const incompleteDailyTasks = dailyTasks.filter(t =>
    !isCompletedOnDate(t, selectedDate) || completingTaskIds.has(t.id)
  );
  const completedDailyTasks = dailyTasks.filter(t =>
    isCompletedOnDate(t, selectedDate) && !completingTaskIds.has(t.id)
  );
  const flexibleTasks = tasks.filter(t => t.recurrence?.mode === 'period_count');

  // Generate daily section label
  const dailySectionLabel = (() => {
    if (isSelectedToday) return '今日行程';
    const d = new Date(selectedDate);
    if (isNaN(d.getTime())) return '行程';
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const ds = selectedDate;
    if (ds === tomorrow.toISOString().split('T')[0]) return '明日行程';
    if (ds === yesterday.toISOString().split('T')[0]) return '昨日行程';
    return `${m}/${day} 行程`;
  })();

  // Check joined templates
  const hasJoinedFlowerTemplate = (() => {
    if (!user?.typeKey) return false;
    return (assignments || []).some(a =>
      a.status === 'active' && a.template?.category === user.typeKey
    );
  })();

  const hasJoinedSleepTemplate = (() => {
    if (!user?.sleepTypeKey) return false;
    const target = SLEEP_TYPE_PROFILES[user.sleepTypeKey]?.categorySlug;
    if (!target) return false;
    return (assignments || []).some(a =>
      a.status === 'active' && a.template?.category === target
    );
  })();

  return (
    <div className="animate-fade-in-up">
      {/* Desktop-only week strip */}
      <div className="hidden md:block mb-4 bg-transparent rounded-2xl border border-gray-100 shadow-sm overflow-visible">
        <WeekStrip
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          tasks={tasks}
          className="px-3 py-1"
        />
      </div>

      {/* Recommendation cards */}
      {showRecommendationCards && (
        <RecommendationCardRow
          onOpenTemplateExplorer={onOpenTemplateExplorer}
          onDismiss={onDismissRecommendation}
        />
      )}

      {/* Focus map banner */}
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
              onClick={onDismissBanner}
              className="p-1 -mr-1 text-gray-400 hover:text-gray-600 text-lg leading-none"
              aria-label="暫時隱藏"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Dashboard summary card */}
      {isSelectedToday && (
        <DashboardSummaryCard
          tasks={tasks}
          onOpenDetail={onOpenDetail}
        />
      )}

      {/* Date browsing pill */}
      {!isSelectedToday && (
        <div className="mb-4 flex items-center justify-between gap-2 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3">
          <p className="text-xs text-indigo-700">
            正在預覽 <span className="font-bold">{dailySectionLabel}</span>
          </p>
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
        {/* Scheduled tasks section */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="text-gray-800 font-bold text-lg flex items-center gap-2">
              <span className="w-1 h-5 bg-emerald-500 rounded-full"></span> {dailySectionLabel}
              {isMenstrualMode && (
                <span className="text-sm font-semibold text-rose-600">生理期中</span>
              )}
            </h3>
            <button
              type="button"
              onClick={() => onToggleMenstrual(!isMenstrualMode)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                isMenstrualMode
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isMenstrualMode ? '結束生理期' : '我正在生理期'}
            </button>
          </div>
          <div className="space-y-2">
            {/* Incomplete tasks */}
            {incompleteDailyTasks.map(task => {
              const isExiting = exitingTaskIds.has(task.id);
              return (
                <div
                  key={task.id}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isExiting ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-[640px] opacity-100'
                  }`}
                >
                  <TaskCard
                    task={task}
                    viewingDate={selectedDate}
                    onClick={() => {
                      onTaskClick(task);
                    }}
                    onUpdate={onUpdateProgress}
                    onAfterAction={onAfterAction}
                    onPickLocation={onPickLocation}
                    onAttachPhoto={onAttachPhoto}
                    attachingKey={attachingKey}
                  />
                </div>
              );
            })}

            {/* Completed tasks divider + collapse section */}
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
                {completedExpanded &&
                  completedDailyTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      viewingDate={selectedDate}
                      onClick={() => {
                        onTaskClick(task);
                      }}
                      onUpdate={onUpdateProgress}
                      onAfterAction={onAfterAction}
                      onPickLocation={onPickLocation}
                      onAttachPhoto={onAttachPhoto}
                      attachingKey={attachingKey}
                    />
                  ))}
              </>
            )}

            {dailyTasks.length === 0 && (
              <p className="text-gray-400 text-sm col-span-full">
                {isSelectedToday ? '今日無固定行程。' : '這天沒有安排任務。'}
              </p>
            )}
          </div>
        </div>

        {/* Period goals section */}
        {isSelectedToday && flexibleTasks.length > 0 && (
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-500 rounded-full"></span> 週期目標 (彈性)
            </h3>
            <div className="space-y-2">
              {flexibleTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  viewingDate={selectedDate}
                  onClick={() => {
                    onTaskClick(task);
                  }}
                  onUpdate={onUpdateProgress}
                  onAfterAction={onAfterAction}
                  onPickLocation={onPickLocation}
                  onAttachPhoto={onAttachPhoto}
                  attachingKey={attachingKey}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyView;
