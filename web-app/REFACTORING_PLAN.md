# MainApp.jsx Refactoring Plan

## 📋 Background & Goal

**Current Problem:**
- MainApp.jsx is 1,710 lines, far exceeding the 150-line ui-demo skill limit
- Contains 5+ different view logics, making code dense and hard to maintain
- Difficult to identify which state/handlers belong to which view

**Refactoring Goal:**
✅ Split MainApp into main container (~450 lines) + View components (each ~100-150 lines)
✅ Maintain exact same functionality—no behavior changes
✅ Follow ui-demo skill guidelines
✅ Improve code maintainability and testability

---

## 🎯 Component Architecture

### MainApp.jsx (Container Component)
**Responsibilities:**
1. **State Management** — all app-level state
   - User, tasks, assignments
   - Modal open/close states
   - View selection
   - Edit/viewing contexts

2. **API Handlers**
   - fetchTasks, fetchAssignments
   - handleLogin, handleLogout
   - handleSaveTask, handleDeleteTask
   - handleUpdateProgress

3. **View Router**
   - Conditionally render DailyView, ManageView, etc.
   - Pass computed derived state to each view

### DailyView.jsx (Presentation Component)
**Responsibility:** Daily task view render
- Week strip date navigation
- Menstrual mode toggle
- Task lists (incomplete/completed partitioning)
- Recommendation cards & focus map banner
- All animations & interactions

**Props:**
- tasks, user, selectedDate, isMenstrualMode, etc.
- onToggleMenstrual, onUpdateProgress, onTaskClick, etc.
- Derived: incompleteDailyTasks, completedDailyTasks, dailyTasks

### ManageView.jsx (Presentation Component)
**Responsibility:** Plan overview render
- Plan groups + solo tasks
- Empty state
- Task deletion/editing

**Props:**
- tasks, assignments, loading
- onTaskClick, onDeleteTask, onUpdateProgress, etc.
- Derived: groupedTasks, soloTasks

### DashboardDetailView.jsx (Presentation Component)
**Responsibility:** Calendar view wrapper
- Simple wrapper around HabitCalendar

**Props:**
- tasks
- onTaskClick, onUpdateProgress

---

## 📝 Implementation Checklist

- [x] Create src/components/views/ directory
- [x] Extract DailyView component
- [x] Extract ManageView component
- [x] Extract DashboardDetailView component
- [x] Update MainApp imports
- [x] Replace view rendering logic with component calls
- [x] Add default export to prisma.js
- [x] Build and test

---

## ✅ Quality Checklist

- [x] Each component under 150 lines
- [x] Tailwind CSS only, no inline styles
- [x] lucide-react icons used
- [x] 'use client' directive present
- [x] No logic changes—pure presentation refactoring
- [x] Build completes successfully
- [x] Development server runs without errors
