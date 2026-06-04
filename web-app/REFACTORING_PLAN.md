# MainApp.jsx Refactoring Plan - Implementation Complete

## Created Components

### 1. DailyView.jsx (154 lines)
**Location**: `/src/components/views/DailyView.jsx`

**Props Interface**:
```javascript
{
  // Data
  tasks,
  selectedDate,
  user,
  
  // Display state
  isMenstrualMode,
  menstrualStart,
  completedExpanded,
  showRecommendationCards,
  candidateCount,
  bannerDismissed,
  
  // Event handlers
  onSelectDate,
  onToggleMenstrual,
  onUpdateProgress,
  onOpenDetail,
  onOpenTemplateExplorer,
  onDismissRecommendations,
  onSetBannerDismissed,
  onSetCompletedExpanded,
  onOpenFocusMap,
  onPickLocation,
  onAttachPhoto,
  onTaskDetailClick,
  
  // Computed values from MainApp
  incompleteDailyTasks,
  completedDailyTasks,
  flexibleTasks,
  dailyTasks,
  isSelectedToday,
  dailySectionLabel,
  todayStr,
  menstrualExpired,
  exitingTaskIds,
  fetchTasks,
  
  // Other
  attachingKey,
}
```

**Renders**:
- Week strip (desktop-only)
- Menstrual mode toggle
- Recommendation cards row
- Focus map banner (when >= 5 candidates)
- Dashboard summary card (when today)
- Date browsing pill (when not today)
- Incomplete tasks with exit animation
- Completed section (collapsible)
- Period goals section (when today)

---

### 2. ManageView.jsx (89 lines)
**Location**: `/src/components/views/ManageView.jsx`

**Props Interface**:
```javascript
{
  // Data
  tasks,
  assignments,
  loading,
  
  // Event handlers
  onTaskClick,
  onDeleteTask,
  onDeleteAssignment,
  onUpdateProgress,
  onOpenTemplateExplorer,
  onOpenLibrary,
  onPickLocation,
  onAttachPhoto,
  
  // Computed values from MainApp
  groupedTasks,
  soloTasks,
  
  // Other
  attachingKey,
}
```

**Renders**:
- Plan groups (from assignments)
- Solo tasks (tasks without assignments)
- Empty state with action buttons
- Loading state

---

### 3. DashboardDetailView.jsx (20 lines)
**Location**: `/src/components/views/DashboardDetailView.jsx`

**Props Interface**:
```javascript
{
  tasks,
  onTaskClick,
  onUpdateProgress,
}
```

**Renders**:
- HabitCalendar (simple wrapper)

---

## MainApp.jsx Refactoring Steps

### Step 1: Add Imports
```javascript
import DailyView from './views/DailyView';
import ManageView from './views/ManageView';
import DashboardDetailView from './views/DashboardDetailView';
```

### Step 2: Delete Old View Code
Remove lines 1221-1472 (the large conditional blocks for each view):
- `currentView === 'daily'` block (lines 1221-1396)
- `currentView === 'dashboard_detail'` block (lines 1398-1404)
- `currentView === 'manage'` block (lines 1406-1453)

### Step 3: Replace with Component Calls
In the main content area (line 1219), replace the view rendering with:

```javascript
{currentView === 'daily' && (
  <DailyView
    tasks={tasks}
    selectedDate={selectedDate}
    onSelectDate={setSelectedDate}
    user={user}
    isMenstrualMode={isMenstrualMode}
    menstrualStart={menstrualStart}
    completedExpanded={completedExpanded}
    showRecommendationCards={showRecommendationCards}
    candidateCount={candidateCount}
    bannerDismissed={bannerDismissed}
    onToggleMenstrual={handleToggleMenstrual}
    onUpdateProgress={handleUpdateProgress}
    onOpenDetail={() => setCurrentView('dashboard_detail')}
    onOpenTemplateExplorer={() => setIsTemplateExplorerOpen(true)}
    onDismissRecommendations={() => setShowRecommendationCards(false)}
    onSetBannerDismissed={setBannerDismissed}
    onSetCompletedExpanded={setCompletedExpanded}
    onOpenFocusMap={() => setIsFocusMapModalOpen(true)}
    onPickLocation={handlePickLocation}
    onAttachPhoto={handleAttachPhoto}
    onTaskDetailClick={(task) => { setViewingTask(task); setIsDetailModalOpen(true); }}
    attachingKey={attachingKey}
    incompleteDailyTasks={incompleteDailyTasks}
    completedDailyTasks={completedDailyTasks}
    flexibleTasks={flexibleTasks}
    dailyTasks={dailyTasks}
    isSelectedToday={isSelectedToday}
    dailySectionLabel={dailySectionLabel}
    todayStr={todayStr}
    menstrualExpired={menstrualExpired}
    exitingTaskIds={exitingTaskIds}
    fetchTasks={fetchTasks}
  />
)}

{currentView === 'manage' && (
  <ManageView
    tasks={tasks}
    assignments={assignments}
    loading={loading}
    onTaskClick={handleTaskClick}
    onDeleteTask={handleDeleteTask}
    onDeleteAssignment={handleDeleteAssignment}
    onUpdateProgress={handleUpdateProgress}
    onOpenTemplateExplorer={() => setIsTemplateExplorerOpen(true)}
    onOpenLibrary={() => setIsLibraryModalOpen(true)}
    onPickLocation={handlePickLocation}
    onAttachPhoto={handleAttachPhoto}
    attachingKey={attachingKey}
    groupedTasks={groupedTasks}
    soloTasks={soloTasks}
  />
)}

{currentView === 'dashboard_detail' && (
  <DashboardDetailView
    tasks={tasks}
    onTaskClick={(task) => { setViewingTask(task); setIsDetailModalOpen(true); }}
    onUpdateProgress={handleUpdateProgress}
  />
)}
```

---

## State Management & Handlers (Remain in MainApp)

The following state and handlers stay in MainApp.jsx:

### State Variables
- user
- tasks
- assignments
- loading
- currentView
- isFormModalOpen
- isLibraryModalOpen
- isTemplateExplorerOpen
- isDetailModalOpen
- isLoginModalOpen
- isProfileModalOpen
- isMenstrualMode
- menstrualStart
- isFocusMapModalOpen
- candidateCount
- bannerDismissed
- completedExpanded
- completingTaskIds
- exitingTaskIds
- undoToast
- activeAspiration
- initialTemplateForExplorer
- aspirationHabitForLibrary
- editingTask
- viewingTask
- selectedDate
- journeyData
- journeyLoading
- attachingKey
- showRecommendationCards
- showStreakCelebration
- streakCount

### Handlers
- handleToggleMenstrual()
- handleLogin()
- handleLogout()
- handleUpdateProgress()
- handlePickLocation()
- handleAttachPhoto()
- handleTaskUpdate()
- scheduleCompletionExit()
- handleUndoCompletion()
- handleSaveTask()
- handleAspirationSelected()
- handleAddHabitAsCandidate()
- handleOpenFocusMapFromPanel()
- handleRecommendationBack()
- handlePickTemplateFromAspiration()
- handlePickHabitFromAspiration()
- handleSkipToTemplates()
- handleSkipToHabits()
- handleAspirationPickerClose()
- handleTemplateJoined()
- handleDeleteTask()
- handleDeleteAssignment()
- handleTaskClick()
- fetchTasks()
- fetchAssignments()
- fetchCandidateCount()
- fetchJourney()
- calculateStreak()

### Computed Values
- dailyTasks
- incompleteDailyTasks
- completedDailyTasks
- flexibleTasks
- todayStr
- isSelectedToday
- dailySectionLabel
- hasJoinedFlowerTemplate
- hasJoinedSleepTemplate
- menstrualExpired
- groupedTasks
- soloTasks

---

## Modal Rendering (Remains in MainApp)

All modal rendering stays in MainApp.jsx:
- TemplateExplorer
- TaskFormModal
- TaskDetailModal
- TaskLibraryModal
- LoginModal
- FocusMapModal
- AspirationPicker
- AspirationRecommendationPanel
- ProfileModal
- UndoToast
- BottomTabBar
- Mobile FAB button
- StreakCelebration
- StatsView
- JourneyView
- AchievementCenter

---

## Result

After refactoring:
- **DailyView.jsx**: 154 lines (view logic only)
- **ManageView.jsx**: 89 lines (view logic only)
- **DashboardDetailView.jsx**: 20 lines (wrapper)
- **MainApp.jsx**: ~450 lines (state management + modals + layout)

**Total**: Reduced from 1710 lines to ~713 lines across 4 files.

## Key Notes

1. All three view components use `'use client'` directive
2. Zero logic changes - components purely render based on props
3. View components import only what they use (DailyView, ManageView, DashboardDetailView)
4. All state management stays in MainApp - views are presentation-only
5. Event handlers remain in MainApp and are passed as callbacks to views
6. Computed values are calculated in MainApp and passed to views
7. No new dependencies added - uses existing imports
8. Each component stays well under 150 lines (per CLAUDE.md)
