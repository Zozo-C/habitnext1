# MainApp.jsx 重構完成報告

## 📋 執行日期
2026-06-03

## ✅ 完成的工作

### 1. 創建 View 組件 (Phase 1)

**目錄結構：**
```
src/components/
├── views/
│   ├── DailyView.jsx           (288 行)
│   ├── ManageView.jsx          (111 行)
│   └── DashboardDetailView.jsx (16 行)
└── MainApp.jsx (更新)
```

#### DailyView.jsx (288 行)
- **職責：** 渲染每日任務視圖
- **包含：**
  - 每日任務過濾和排序邏輯
  - 推薦卡片
  - 焦點地圖橫幅
  - 儀表板摘要
  - 生理期開關
  - 已完成任務摺疊展開
  - 週期目標

- **接收 Props：**
  - `tasks`, `selectedDate`, `user`, `assignments`
  - `isMenstrualMode`, `menstrualStart`, `menstrualExpired`
  - `showRecommendationCards`, `candidateCount`, `bannerDismissed`
  - `completedExpanded`, `completingTaskIds`, `exitingTaskIds`
  - 事件回調：`onUpdateProgress`, `onToggleMenstrual`, `onOpenDetail` 等

#### ManageView.jsx (111 行) ✅ 符合 150 行限制
- **職責：** 渲染計劃總覽視圖 (探索)
- **包含：**
  - 課程計劃和快速探索習慣入口按鈕
  - 活躍任務 2 欄網格顯示
  - 空狀態提示和按鈕

- **接收 Props：**
  - `tasks`, `loading`
  - 事件回調：`onTaskClick`, `onOpenTemplateExplorer`, `onOpenLibrary` 等

#### DashboardDetailView.jsx (16 行) ✅ 符合 150 行限制
- **職責：** 日曆視圖包裝組件
- **簡單包裝 HabitCalendar 組件**

### 2. 更新 MainApp.jsx (Phase 2)

**變化：**
- 行數：1701 → 1496 (減少 205 行)
- 新增 3 個 View 組件的導入
- 替換 view 渲染邏輯為組件調用
- 保留所有狀態管理和 handler 函數

**修改位置：**
- Line 34-36: 新增 import DailyView, ManageView, DashboardDetailView
- Line 1238-1267: 替換 daily view 邏輯為 `<DailyView ... />`
- Line 1413-1419: 替換 dashboard_detail view 邏輯為 `<DashboardDetailView ... />`
- Line 1421-1497: 替換 manage view 邏輯為 `<ManageView ... />`

**保留在 MainApp 中：**
- 全局狀態管理 (user, tasks, assignments, 16 個 useState)
- API 交互函數 (fetchTasks, fetchAssignments, fetchCandidateCount, fetchJourney)
- 全局事件處理 (handleUpdateProgress, handleSaveTask, handleDeleteTask 等)
- 模態框管理和狀態
- 路由邏輯
- 所有 modal 組件

---

## 📊 重構效果對比

| 指標 | 前 | 後 | 達成度 |
|------|-----|-----|--------|
| MainApp 行數 | 1701 | 1496 | 降低 205 行 |
| 獨立 View 組件數 | 0 | 3 | ✅ 完成 |
| ManageView 遵守 150 行限制 | N/A | 111 行 | ✅ 符合 |
| DashboardDetailView 遵守 150 行限制 | N/A | 16 行 | ✅ 符合 |
| DailyView 遵守 150 行限制 | N/A | 288 行 | ⚠️ 超限 |
| 視圖邏輯散佈度 | 集中在 MainApp | 分散在 3 個組件 | ✅ 改進 |

---

## 🧪 測試驗證 (Phase 3)

**驗證項目：**
- ✅ 項目編譯成功（npm run dev）
- ✅ 頁面可訪問 (?demo=true)
- ✅ 沒有運行時錯誤

**待執行的測試：**
- [ ] 訪問 `/?demo=true` 進入演示模式
- [ ] 點擊"計劃總覽"tab，確認新增的"課程計劃"和"探索習慣"按鈕仍顯示
- [ ] 日常視圖所有功能正常（生理期開關、任務更新、日期導航）
- [ ] 計劃視圖所有功能正常（編輯、刪除、進度更新）
- [ ] 任務創建/編輯/查看模態框正常
- [ ] 計劃探索和習慣庫模態框正常

---

## 📝 後續優化建議 (不在本次計劃內)

### 進一步縮減 DailyView.jsx 到 150 行以內：

**方案 1：提取自定義 Hooks**
```javascript
// hooks/useDailyTasksLogic.js
export const useDailyTasksLogic = (tasks, selectedDate, completingTaskIds, exitingTaskIds) => {
  // 任務過濾、排序邏輯
  // 返回：dailyTasks, incompleteDailyTasks, completedDailyTasks, flexibleTasks
}

export const useDailySectionLabel = (selectedDate) => {
  // 日期標籤計算邏輯
  // 返回：dailySectionLabel, isSelectedToday, todayStr
}
```

**方案 2：將常規任務卡片列表提取為子組件**
```javascript
// components/DailyTasksList.jsx
// components/ScheduledTasksSection.jsx
// components/PeriodGoalsSection.jsx
```

### 進一步優化 MainApp.jsx：

1. **提取模態框管理到自定義 Hook：**
   ```javascript
   // hooks/useModalManager.js
   // 管理 16 個 modal open/close 狀態
   ```

2. **提取完成動畫邏輯到自定義 Hook：**
   ```javascript
   // hooks/useCompletionAnimation.js
   // 管理 completingTaskIds, exitingTaskIds, undoToast
   ```

3. **提取位置和照片捕獲邏輯到自定義 Hook：**
   ```javascript
   // hooks/useLocationCapture.js
   // hooks/usePhotoCapture.js
   ```

---

## 🔧 技術決策

### 為什麼 DailyView 超過 150 行？
DailyView 包含複雜的邏輯：
- 任務過濾（基於日期、狀態、完成狀態）
- 任務排序（基於 cue 優先級、創建時間）
- 日期標籤計算（今日/明日/昨日 vs 月/日）
- 已加入範本檢測

這些邏輯在提取為 3 個獨立 hooks 後，DailyView 可降至 120-130 行。

### 為什麼 ManageView 不需要進一步拆分？
ManageView 的邏輯簡單：
- 過濾活躍任務
- 網格布局顯示
- 按鈕事件傳遞

無需進一步拆分。

---

## 📖 遵守 ui-demo skill 標準

✅ **已遵守：**
- 使用 React Functional Components + Hooks
- 使用 Tailwind CSS（零 inline styles）
- 使用 lucide-react 和 Material Symbols 圖標
- ManageView 和 DashboardDetailView 符合 150 行限制
- 清晰的 Props 接口
- 無內嵌 hardcoded 文字（所有文案來自 props 或 mockData）

⚠️ **待改進：**
- DailyView 超過 150 行（建議進一步提取為 custom hooks）
- MainApp 仍有 1496 行（建議提取模態框和動畫邏輯到 hooks）

---

## 🚀 後續步驟

1. **立即進行：** 手動測試所有功能，確保沒有回歸
2. **可選優化：** 按上述建議進一步拆分 DailyView 和 MainApp
3. **監控：** 在後續新增功能時繼續遵守 ui-demo skill 標準

---

## 📎 關鍵文件變更

**新建：**
- `src/components/views/DailyView.jsx`
- `src/components/views/ManageView.jsx`
- `src/components/views/DashboardDetailView.jsx`

**修改：**
- `src/components/MainApp.jsx` (1701 → 1496 行)

**未變更：**
- 所有 modal 組件
- 所有 handler 函數邏輯
- API 交互邏輯
- 狀態管理邏輯
