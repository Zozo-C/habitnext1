# MainApp.jsx 重構 - 實施檢查清單

## ✅ 完成的任務

### Phase 1: 創建 View 組件
- [x] 建立 `src/components/views/` 目錄
- [x] 創建 `DailyView.jsx` (288 行)
  - [x] 包含每日任務過濾和排序邏輯
  - [x] 實現推薦卡片、焦點地圖橫幅
  - [x] 實現生理期開關功能
  - [x] 實現已完成任務摺疊展開
  - [x] 實現週期目標顯示
- [x] 創建 `ManageView.jsx` (111 行) ✅ 符合 150 行限制
  - [x] 包含探索計劃和習慣庫按鈕
  - [x] 顯示活躍任務網格
  - [x] 空狀態提示
- [x] 創建 `DashboardDetailView.jsx` (16 行) ✅ 符合 150 行限制
  - [x] 簡單包裝 HabitCalendar 組件

### Phase 2: 更新 MainApp.jsx
- [x] 添加 View 組件導入 (lines 34-36)
- [x] 替換 daily view 渲染邏輯 (line ~1238)
  - [x] 移除 JSX 代碼
  - [x] 替換為 `<DailyView ... />`
  - [x] 傳遞所有必要的 props 和 event handlers
- [x] 替換 dashboard_detail view 渲染邏輯 (line ~1413)
  - [x] 移除 HabitCalendar 直接調用
  - [x] 替換為 `<DashboardDetailView ... />`
- [x] 替換 manage view 渲染邏輯 (line ~1421)
  - [x] 移除 explore 按鈕和任務網格 JSX
  - [x] 替換為 `<ManageView ... />`
- [x] 保留 stats, journey, badges view 原狀
- [x] 驗證所有 handler 函數保留在 MainApp
  - [x] `handleUpdateProgress`
  - [x] `handleToggleMenstrual`
  - [x] `handleSaveTask`
  - [x] `handleDeleteTask`
  - [x] `handleDeleteAssignment`

### Phase 3: 測試驗證
- [x] 檢查編譯 - 無 TypeScript 錯誤
- [x] 驗證 View 組件文件存在且大小正確
- [x] Dev 服務器運行成功 (`npm run dev`)
- [x] 演示頁面可訪問 (`?demo=true`)
- [x] 頁面加載無運行時錯誤
- [ ] 訪問 `/?demo=true` 進入演示模式（待手動測試）
- [ ] 測試日常視圖功能（待手動測試）
  - [ ] 生理期開關
  - [ ] 任務更新
  - [ ] 日期導航
  - [ ] 推薦卡片
  - [ ] 焦點地圖橫幅
- [ ] 測試計劃視圖功能（待手動測試）
  - [ ] 課程計劃按鈕
  - [ ] 快速探索習慣按鈕
  - [ ] 任務網格顯示
  - [ ] 任務卡片顏色
- [ ] 測試所有模態框（待手動測試）
  - [ ] 任務創建/編輯
  - [ ] 任務詳情查看
  - [ ] 計劃探索
  - [ ] 習慣庫

---

## 📊 重構成果

| 指標 | 成果 |
|------|------|
| 主組件行數縮減 | 1701 → 1496 行 (-205 行) |
| 新建 View 組件數 | 3 個 |
| 符合 150 行限制的組件 | 2/3 (ManageView, DashboardDetailView) |
| 代碼組織改進 | 視圖邏輯已分散到獨立組件 |
| 技術規範遵守 | React FC + Hooks, Tailwind CSS, lucide-react |

---

## 🔄 待優化任務

### 高優先級（建議立即進行）
1. **進行完整功能測試**
   - 手動測試所有視圖和交互
   - 確認沒有回歸問題

### 中優先級（後續優化）
1. **提取 DailyView.jsx 的複雜邏輯到 custom hooks**
   - `useDailyTasksLogic.js` - 任務過濾和排序
   - `useDailySectionLabel.js` - 日期標籤計算
   - `useJoinedTemplates.js` - 已加入範本檢測
   - 目標：將 DailyView.jsx 縮減至 ~150 行

2. **進一步優化 MainApp.jsx**
   - `useModalManager.js` - 管理 16 個 modal 狀態
   - `useCompletionAnimation.js` - 完成動畫邏輯
   - `useLocationAndPhotoCapture.js` - 位置和照片捕獲
   - 目標：將 MainApp.jsx 縮減至 ~450-500 行

### 低優先級（可選改進）
1. **提取子組件進一步拆分視圖**
   - `components/sections/ScheduledTasksSection.jsx`
   - `components/sections/PeriodGoalsSection.jsx`
   - `components/sections/ExploreSectionButtons.jsx`

---

## 📝 實施備註

### DailyView.jsx 為何超過 150 行？
- 包含複雜的任務過濾邏輯（基於日期、狀態、完成狀態）
- 包含任務排序邏輯（基於 cue 優先級、創建時間）
- 包含日期標籤計算邏輯
- 包含範本加入檢測邏輯

**解決方案：** 提取為 custom hooks（預計可減至 120-130 行）

### Props 傳遞層次
```
MainApp
├── DailyView (接收 ~20 個 props)
├── ManageView (接收 ~8 個 props)
└── DashboardDetailView (接收 ~3 個 props)
```

所有 props 都明確列出，無隱式依賴。

---

## 🚀 部署前檢查

在生產部署前：
- [ ] 通過完整的 QA 測試
- [ ] 驗證所有功能符合原始需求
- [ ] 確認沒有性能回歸
- [ ] 檢查 bundle size 是否增加
- [ ] 更新相關文檔

---

## 📎 相關文件

- **新建：** `REFACTORING_SUMMARY.md` - 詳細的重構報告
- **新建：** `IMPLEMENTATION_CHECKLIST.md` - 本文件
- **修改：** `src/components/MainApp.jsx`
- **新建：** `src/components/views/DailyView.jsx`
- **新建：** `src/components/views/ManageView.jsx`
- **新建：** `src/components/views/DashboardDetailView.jsx`

---

## ⏱️ 時間線

| 日期 | 完成 | 內容 |
|------|------|------|
| 2026-06-03 | ✅ | Phase 1: 創建 3 個 View 組件 |
| 2026-06-03 | ✅ | Phase 2: 更新 MainApp.jsx |
| 2026-06-03 | ✅ | 驗證編譯和運行 |
| 待排期 | ⏳ | Phase 3: 完整功能測試 |
| 待排期 | ⏳ | 後續優化（custom hooks） |

---

## 📞 聯絡事項

如有問題或需要進一步優化，請參考：
- `REFACTORING_SUMMARY.md` - 詳細技術文檔
- `src/components/views/*.jsx` - 新建組件源代碼
- `src/components/MainApp.jsx` - 主應用容器（已更新）
