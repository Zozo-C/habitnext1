# HabitNext — 功能與流程完整指南

> 本文檔獨立整理 HabitNext 的所有核心功能、使用者流程、數據模型和組件清單。
> 面向開發人員和產品經理快速理解應用的端到端架構。
>
> 最後更新：2026-06-01

---

## 目錄

1. [核心功能模塊](#核心功能模塊)
2. [使用者流程](#使用者流程)
3. [數據模型](#數據模型)
4. [頁面與導航](#頁面與導航)
5. [API 路由](#api-路由)
6. [關鍵交互特性](#關鍵交互特性)
7. [科學基礎](#科學基礎)
8. [組件清單](#組件清單)

---

## 核心功能模塊

### 1. 日常任務管理 (Daily Task Management)

**作用**：用戶的主要使用界面，顯示今日所有待完成和已完成的任務。

#### 功能特性
- **任務類型**：
  - **Binary (是/否)**：簡單的完成/未完成檢查
  - **Quantitative (數量)**：追蹤數值進度（如喝 8 杯水、運動 30 分鐘）
  - **Checklist (清單)**：多步驟子任務，每一步獨立追蹤

- **任務分組**：
  - 未完成任務（按錨點/時間順序）
  - 已完成任務（可折疊展開）
  - 柔性週期目標（週/月目標累積）

- **交互方式**：
  - **點擊打勾**：完成任務 → 觸發脈衝動畫 → 移至已完成區 → 3-5 秒撤銷提示
  - **左滑**：顯示暫停/刪除按鈕（僅限過期/已完成任務）
  - **右滑**：撤銷完成狀態
  - **點擊卡片**：打開任務詳情模態

#### 相關組件
- `MainApp.jsx` - 主應用協調器
- `DailyTasksSection.jsx` - 日常任務區域佈局
- `TaskCard.jsx` - 單個任務卡片（包含完成動畫）
- `SwipeReveal.jsx` - 滑動手勢處理
- `UndoToast.jsx` - 撤銷通知提示

---

### 2. 模板系統與習慣庫 (Template System & Habit Library)

**作用**：提供專家推薦的習慣組合和單個習慣的庫。

#### 功能特性

**模板 (Plans/Templates)**：
- 由健康專家策劃的習慣組合
- 9 個健康領域分類（飲食/運動/睡眠/心理/社交/認知/職涯等）
- 3 個難度等級：入門 / 進階 / 挑戰
- 每個難度有不同的任務指標和頻率
- 支援日期選擇加入（今天/明天/自訂）

**習慣庫 (Official Habits)**：
- 105 個內建習慣
- 按 9 個領域分類
- 每個習慣提供 3 個難度版本
- 支援科學洞察鏈接（研究論文）

#### 加入流程

```
用戶點擊 "新增習慣" 或 "瀏覽計劃"
  ↓
TemplateExplorer 彈出 (或 TaskLibraryModal)
  ↓
瀏覽、搜尋、篩選習慣/計劃
  ↓
選擇計劃或習慣
  ↓
選擇開始日期（今天/明天/自訂）
  ↓
POST /api/user/assignments (加入模板)
或 POST /api/tasks (添加習慣)
  ↓
新任務進入 "候選" 狀態（進入焦點地圖）
```

#### 相關組件
- `TemplateExplorer.jsx` - 模板瀏覽器
- `TemplateDetailPanel.jsx` - 模板詳情和加入按鈕
- `TaskLibraryModal.jsx` - 習慣庫選擇
- `RecommendationCardRow.jsx` - 個人化推薦

---

### 3. 個人資料與身份系統 (Profile & Identity System)

**作用**：管理用戶個人信息、化身和身份認同。

#### 功能特性

**用戶檔案**：
- 暱稱、電話、密碼
- 花朵化身選擇（雛菊/玫瑰/蘭花/向日葵）
- 睡眠檔案選擇（壓力/節律/代謝/荷爾蒙）

**化身與推薦鏈接**：
- 用戶 `typeKey` → 花朵化身風格
- 用戶 `sleepTypeKey` → 睡眠相關推薦
- 推薦模板和習慣根據這兩個維度個人化

**身份認同**：
- 為每個習慣設定個人化名稱（如"晨跑者"、"冥想者"）
- 每個身份類型有預設名稱池
- 支援自訂身份名稱

#### 相關組件
- `ProfileModal.jsx` - 檔案設定和標籤
- `profile/MyAspirationsTab.jsx` - 我的嚮往標籤
- `lib/avatars.jsx` - 化身定義和渲染

---

### 4. 嚮往系統 (Aspirations) - v2.0 新功能

**作用**：讓用戶定義個人目標，引導習慣推薦和進度追蹤。

#### 功能特性

**嚮往定義**：
- 用戶自定義的個人目標（如"擁有健康的身體"、"提升專注力"）
- 選擇所屬健康領域（9 個 GENESIS+IO 領域）
- 狀態管理：進行中 / 已達成 / 歸檔

**嚮往驅動的習慣添加流程**：

```
1. 用戶點擊 "按嚮往添加"

   ↓
2. AspirationPicker
   - 展示個人化預設（睡眠型+花朵型驅動）
   - 列出用戶現有嚮往
   - 允許創建新嚮往
   ↓
3. 選擇或創建嚮往
   ↓
4. AspirationRecommendationPanel
   - 過濾相同領域的計劃和習慣
   - 使用焦點地圖排序候選項
   ↓
5. 用戶選擇習慣或計劃
   ↓
6. 習慣自動標記所屬嚮往
```

#### 嚮往預設（個人化）

根據用戶的睡眠類型和花朵型自動推薦預設嚮往。例如：
- 睡眠壓力型 → 推薦"減少壓力"嚮往
- 代謝失衡型 → 推薦"恢復新陳代謝"嚮往

#### 相關組件
- `AspirationPicker.jsx` - 嚮往選擇第 1 步
- `AspirationRecommendationPanel.jsx` - 嚮往推薦第 2-3 步
- `profile/MyAspirationsTab.jsx` - 我的嚮往管理
- `lib/aspirations.js` - 嚮往邏輯（過濾、重複檢測、預設匹配）

#### 相關 API
```
GET    /api/aspirations              - 用戶的嚮往
POST   /api/aspirations              - 創建嚮往
PATCH  /api/aspirations/:id          - 更新狀態
DELETE /api/aspirations/:id          - 刪除嚮往
GET    /api/aspirations/:id/habits   - 嚮往關聯的習慣
POST   /api/aspirations/:id/habits   - 將任務鏈接到嚮往
```

---

### 5. 焦點地圖 (Focus Map) - Fogg 行為模型

**作用**：防止用戶一次添加過多習慣導致放棄。基於 BJ Fogg 行為模型的影響力 vs 可行性象限。

#### 問題與解決

**問題**：用戶傾向於一次添加太多習慣 → 認知過載 → 放棄所有習慣

**解決方案**：
1. 新習慣進入"候選"狀態（不在日常視圖）
2. 用戶逐個評估每個候選習慣
3. 基於影響力和可行性分類到 4 個象限
4. 一次最多激活 3 個"黃金象限"習慣

#### 象限分類

```javascript
// 影響力 >= 4 AND 可行性 >= 4
黃金象限 (Golden): "立即做！"
   → 自動勾選（最多 3 個）
   → 用戶確認後激活到日常

// 影響力 < 4 AND 可行性 >= 4
背景任務 (Background): "簡單但低價值"
   → 可選，通常可以跳過

// 影響力 >= 4 AND 可行性 < 4
大事件 (Big Fish): "重要但困難"
   → 建議暫停，等準備好再做

// 影響力 < 4 AND 可行性 < 4
跳過 (Skip): "不值得現在做"
   → 建議放棄
```

#### 焦點地圖流程

```
用戶添加習慣
  ↓
習慣進入候選狀態
  ↓
用戶點擊 "評估習慣" 或自動打開 FocusMapModal
  ↓
滑動影響力和可行性滑塊（1-10 分）
  ↓
實時顯示該習慣屬於的象限
  ↓
黃金象限習慣自動勾選（最多 3 個）
  ↓
用戶確認選擇
  ↓
選定習慣激活到日常視圖，其他保持候選
```

#### 相關組件
- `FocusMapModal.jsx` - 焦點地圖模態（主控制器）
- `focusMap/MiniMap.jsx` - 象限摘要視圖
- `focusMap/QuadrantSection.jsx` - 象限詳情和任務列表
- `lib/focusMap.js` - 象限邏輯和評分

#### 相關 API
```
GET    /api/tasks/candidates          - 所有候選狀態的任務
PATCH  /api/tasks/batch-rate          - 批量操作（激活/歸檔/保留）
```

---

### 6. 統計與連續記錄 (Statistics & Streaks)

**作用**：視覺化用戶的進度、習慣堅持情況和領域分佈。

#### 功能特性

**連續記錄** (Streak):
- **當前連續記錄**：從今天往前計算的連續完成天數
- **寬限時間**：當天缺少一天不中斷連續記錄
- **最長連續記錄**：歷史最高連續天數

**完成率** (Completion Rate):
- 7 天完成率
- 30 天完成率
- 計算方式：(完成任務數 / 預期任務數) × 100%

**領域分佈** (Domain Breakdown):
- 圓餅圖展示按健康領域的習慣分佈
- 各領域用不同顏色標識
- 幫助用戶了解習慣的多樣性

**12 週熱力圖** (Weekly Heatmap):
- 84 天（12 週）的完成歷史可視化
- 深綠色 = 完成，淺色 = 未完成或部分完成
- 支援與 GitHub 熱力圖類似的交互

**頂級任務連續記錄** (Top Task Streaks):
- 列出連續完成最多的 5 個任務
- 展示每個任務的當前和最長連續記錄

#### 相關組件
- `StatsView.jsx` - 統計視圖（父容器）
- `stats/StreakHero.jsx` - 當前和最長連續記錄展示
- `stats/CompletionRateCards.jsx` - 完成率卡片
- `stats/DomainBreakdownChart.jsx` - 領域分佈圓餅圖
- `stats/WeeklyHeatmap.jsx` - 12 週熱力圖
- `stats/TaskStreakList.jsx` - 頂級任務排行
- `lib/stats.js` - 統計計算邏輯

#### 相關 API
```
GET    /api/stats    - 聚合統計數據（連續記錄、熱力圖、領域分佈）
```

---

### 7. 習慣日曆 (Habit Calendar)

**作用**：提供月視圖和週視圖，讓用戶查看和編輯任何日期的任務。

#### 功能特性

**月視圖** (Month View):
- 展示整月日期網格
- 每天顯示任務數量和完成情況
- 支援月份導航（上一月/下一月）

**週視圖** (Week View):
- 展示週摘要
- 支援週視圖的左右滑動導航

**日期選擇帶** (Week Strip):
- 快速日期跳轉
- 顯示周一到週日的縮寫
- 點擊選擇日期

**日期狀態**：
- **今天**：無鎖定，可編輯
- **過去日期**：唯讀，無法編輯
- **未來日期**：鎖定（顯示 🔒 圖標），無法編輯

#### 相關組件
- `HabitCalendar.jsx` - 日曆父控制器
- `calendar/MonthView.jsx` - 月視圖網格
- `calendar/WeekView.jsx` - 週視圖

---

### 8. 管理視圖 (Manage View)

**作用**：聚合展示所有加入的計劃及其任務，支援快速管理。

#### 功能特性

**按計劃分組**：
- 每個加入的模板作為一個"計劃組"
- 展示該計劃內的所有任務
- 展示加入日期和狀態

**快速操作**：
- 編輯任務
- 刪除任務
- 退出計劃
- 查看計劃詳情

**組織視圖**：
- 進行中的計劃
- 已完成的計劃
- 歸檔的計劃

#### 相關組件
- `ManageView.jsx` - 主管理視圖
- `PlanGroup.jsx` - 計劃分組組件

---

### 9. 科學洞察系統 (Scientific Briefs - Slice N)

**作用**：為習慣附加科學證據和研究論文，增強用戶對習慣重要性的理解。

#### 功能特性

**用戶端展示** (HabitInsightSection):
- 在習慣庫列表中展示可展開的洞察卡片
- 在任務詳情模態中展示科學證據
- 展示內容：研究摘要、來源（PubMed/期刊/書籍）、外部鏈接
- **靜默缺失**：沒有洞察時不顯示，保持界面清潔

**管理端管理** (Admin Dashboard):
- 為官方習慣添加科學洞察
- CRUD 操作：創建、編輯、刪除洞察
- 支援多個洞察每個習慣
- 字段：摘要文本（Markdown）、來源類型、來源 URL、是否發佈

**Markdown 支援**：
- 洞察內容使用 Markdown 格式存儲
- 前端動態加載 `react-markdown` 渲染（僅在展開時加載，節省初始 JS）

**來源類型**：
- PubMed（醫學論文數據庫）
- Journal（期刊論文）
- Book（書籍）

#### 相關組件
- `insights/HabitInsightSection.jsx` - 用戶端洞察展示（可展開卡片）
- Admin 面板中的洞察管理界面

#### 相關 API
```
GET    /api/habits/:habitId/insights    - 獲取習慣的洞察
PATCH  /api/admin/habits/:id/insights   - 管理洞察（CRUD）
```

---

### 10. 管理員儀表板 (Admin Dashboard)

**作用**：供健康專家和管理員管理習慣庫、模板、用戶和科學洞察。

#### 功能區域

**習慣管理** (`/admin/dashboard/habits`):
- 創建新習慣（指定 3 個難度等級）
- 編輯習慣詳情、圖標、分類
- 管理科學洞察（Markdown 摘要 + 來源鏈接）
- 批量操作
- 預覽習慣（含洞察）

**模板構建** (`/admin/dashboard/templates`):
- 創建新計劃/模板
- 從習慣庫選擇任務組成計劃
- 設定模板分類、顏色、圖標
- 發佈/存檔模板
- 預覽計劃的 4 個階段

**用戶分析** (`/admin/dashboard/users`):
- 查看用戶統計（總數、活躍用戶等）
- 用戶分頁瀏覽
- 查看用戶詳情和進度

**計劃統計** (`/admin/dashboard/assignments`):
- 查看用戶加入的計劃統計
- 計劃使用情況分析

**分類管理** (`/admin/dashboard/categories`):
- 管理計劃分類
- 設定顏色、圖標、域映射

**專家管理** (`/admin/dashboard/experts`):
- 管理健康專家賬戶
- 設定專家檔案和權限

#### 相關 API
```
POST   /api/admin/auth/login           - 專家登錄
POST   /api/admin/auth/register        - 專家註冊
GET    /api/admin/habits               - 習慣庫（過濾）
POST   /api/admin/habits               - 創建習慣
PUT    /api/admin/habits/:id           - 更新習慣
PATCH  /api/admin/habits/:id/insights  - 管理科學洞察
GET    /api/admin/templates            - 專家的模板
POST   /api/admin/templates            - 創建模板
PUT    /api/admin/templates/:id        - 更新模板
GET    /api/admin/users                - 用戶列表
GET    /api/admin/assignments          - 計劃統計
POST   /api/admin/plan-categories      - 管理分類
GET    /api/admin/experts              - 專家列表
```

---

## 使用者流程

### 完整新用戶入職流程

```
1. 訪問應用
   ↓
2. 登錄/註冊
   - 電話號碼
   - 密碼設定
   - 國家選擇
   ↓
3. 填寫檔案問卷（可選跳過）
   - 選擇花朵化身（女性週期類型）
   - 選擇睡眠類型
   - 設定暱稱
   ↓
4. 定義個人嚮往（可選）
   - 創建或選擇預設嚮往
   - 選擇所屬領域
   ↓
5. 添加首個習慣 → 3 種方式：
   a. 瀏覽模板計劃
      - TemplateExplorer 展示個人化推薦
      - 選擇計劃 → 選擇開始日期 → 確認
      - 計劃內習慣進入候選狀態

   b. 瀏覽習慣庫
      - TaskLibraryModal 展示習慣
      - 選擇難度 → 選擇錨點 → 選擇身份 → 創建

   c. 自訂習慣
      - TaskFormModal 創建自訂習慣
      - 設定標題、頻率、類型等
   ↓
6. 進入焦點地圖評估
   - 滑動評估新習慣的影響力和可行性
   - 系統推薦黃金象限習慣
   - 用戶選擇最多 3 個激活
   ↓
7. 激活習慣到日常視圖
   ↓
8. 開始日常使用
```

### 日常使用流程

```
打開應用
  ↓
查看今日任務 (Daily View)
  ↓
逐個完成任務
  - 點擊打勾 → 動畫 → 移至已完成區
  - 顯示撤銷提示 (3-5 秒)
  ↓
選擇操作：
  - 繼續完成其他任務
  - 撤銷已完成任務
  - 左滑刪除或暫停
  ↓
查看進度統計
  - 完成率
  - 連續記錄
  - 領域分佈
  ↓
探索新習慣或計劃（週末或月度）
  - 瀏覽推薦
  - 按嚮往篩選
  - 加入新計劃
```

### 添加習慣的完整流程（按嚮往）

```
用戶點擊 "按嚮往添加"
  ↓
AspirationPicker 彈出
  1️⃣ 顯示個人化預設（睡眠型+花朵型驅動）
  2️⃣ 列出用戶的現有嚮往
  3️⃣ 允許創建新嚮往 + 選擇領域
  ↓
用戶選擇嚮往
  ↓
AspirationRecommendationPanel 彈出
  1️⃣ 過濾相同領域的計劃和習慣
  2️⃣ 使用焦點地圖邏輯排序（按影響力/可行性）
  3️⃣ 展示推薦習慣和計劃
  ↓
用戶選擇習慣或計劃
  ↓
如果選習慣：
  - TaskLibraryModal 打開
  - 用戶選擇難度、錨點、身份
  - 習慣創建，自動標記嚮往

如果選計劃：
  - TemplateExplorer 打開
  - 用戶選擇開始日期
  - 計劃加入，習慣自動標記嚮往
  ↓
習慣進入候選狀態
  ↓
焦點地圖評估流程（見上文）
```

---

## 數據模型

### Task (任務)

```javascript
{
  id: String,
  userId: String,

  // 基本信息
  title: String,                    // 習慣標題
  details: String,                  // 詳細說明
  category: String,                 // 健康領域分類

  // 任務類型
  type: 'binary' | 'quantitative' | 'checklist',
  dailyTarget: Number,              // 日目標
  unit: String,                     // 單位
  stepValue: Number,                // 單次增量

  // 頻率
  recurrence: {
    type: 'daily' | 'weekly' | 'monthly' | 'custom',
    interval: Number,
    mode: 'exact_date' | 'nth_weekday',
    endType: 'never' | 'on' | 'count',
    endDate: Date,
    endCount: Number,
    weekDays: [Number],
    monthType: 'date' | 'weekday',
    periodTarget: Number,
  },

  // 提醒
  reminder: {
    enabled: Boolean,
    offset: Number,
  },

  // 子任務
  subtasks: [{ id, title, order, startDate, endDate }],

  // 行為科學
  cue: String,                      // 錨點
  identity: String,                 // 身份認同

  // 鏈接
  assignmentId: String,
  officialHabitId: String,

  // 狀態
  status: 'active' | 'candidate' | 'archived',
  isLocked: Boolean,

  // 進度歷史
  history: [{
    date: String,
    completed: Boolean,
    value: Number,
    subtaskCompletions: Object,
  }],

  createdAt: Date,
  updatedAt: Date,
}
```

### Aspiration (嚮往)

```javascript
{
  id: String,
  userId: String,

  text: String,
  domain: String,
  status: 'active' | 'achieved' | 'archived',
  source: 'preset' | 'user',

  habits: [{ taskId: String, habitId: String }],

  createdAt: Date,
  achievedAt: Date,
}
```

### UserAssignment (用戶計劃)

```javascript
{
  id: String,
  userId: String,
  templateId: String,

  status: String,
  startDate: Date,
  completedAt: Date,

  createdAt: Date,
  updatedAt: Date,
}
```

### OfficialHabit (官方習慣)

```javascript
{
  id: String,

  name: String,
  description: String,
  icon: String,
  category: String,

  difficulties: {
    beginner: { type, dailyTarget, unit, stepValue, recurrence, subtasks },
    intermediate: {...},
    challenge: {...},
  },

  impact: Number,
  ability: Number,
  source: String,

  createdAt: Date,
  updatedAt: Date,
}
```

### Template (模板計劃)

```javascript
{
  id: String,
  expertId: String,

  name: String,
  description: String,
  category: { slug, icon, color },

  status: 'draft' | 'published' | 'archived',

  habits: [{ habitId, order }],

  recommendedFor: {
    typeKeys: [String],
    sleepTypeKeys: [String],
  },

  createdAt: Date,
  updatedAt: Date,
}
```

### User (用戶)

```javascript
{
  id: String,

  phone: String,
  passwordHash: String,
  nickname: String,

  // 雙維分型
  typeKey: 'daisy' | 'rose' | 'orchid' | 'sunflower',
  sleepTypeKey: 'stress' | 'rhythm' | 'metabolic' | 'hormone',

  avatar: String,

  country: String,
  timezone: String,

  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
}
```

---

## 頁面與導航

### 主應用頁面結構

```
主應用 (MainApp.jsx)
├── Daily (日常)
│   ├── DailyTasksSection
│   ├── RecommendationCardRow
│   └── DashboardSummary
│
├── Dashboard Detail (日曆)
│   ├── HabitCalendar
│   └── WeekStrip
│
├── Manage (管理)
│   └── ManageView
│
├── Stats (統計)
│   ├── StreakHero
│   ├── CompletionRateCards
│   ├── DomainBreakdownChart
│   ├── WeeklyHeatmap
│   └── TaskStreakList
│
└── Badges (成就) - 預留
```

### 模態/浮窗體系

```
主要模態：
- LoginModal (登錄/註冊)
- TaskFormModal (任務創建/編輯)
- TaskDetailModal (任務詳情查看)
- TemplateExplorer (計劃瀏覽)
- TaskLibraryModal (習慣庫)
- FocusMapModal (焦點地圖評估)
- AspirationPicker (嚮往選擇)
- AspirationRecommendationPanel (嚮往推薦)
- ProfileModal (檔案設定)

工具組件：
- UndoToast (撤銷通知)
- BottomTabBar (移動導航)
- SidebarNavigation (桌面側邊欄)
```

---

## API 路由

### 身份驗證
```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/demo
POST   /api/auth/logout
```

### 用戶
```
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/assignments
DELETE /api/user/assignments/:id
```

### 任務
```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/candidates
PATCH  /api/tasks/batch-rate
POST   /api/tasks/:id/subtasks
PATCH  /api/tasks/:id/subtasks/:subtaskId
```

### 習慣
```
GET    /api/habits
GET    /api/habits/:habitId/insights
```

### 計劃
```
GET    /api/templates/public
POST   /api/user/assignments
```

### 嚮往
```
GET    /api/aspirations
POST   /api/aspirations
PATCH  /api/aspirations/:id
DELETE /api/aspirations/:id
GET    /api/aspirations/:id/habits
POST   /api/aspirations/:id/habits
```

### 統計
```
GET    /api/stats
```

### 管理員
```
POST   /api/admin/auth/login
POST   /api/admin/auth/register
GET    /api/admin/habits
POST   /api/admin/habits
PUT    /api/admin/habits/:id
PATCH  /api/admin/habits/:id/insights
GET    /api/admin/templates
POST   /api/admin/templates
PUT    /api/admin/templates/:id
GET    /api/admin/users
GET    /api/admin/assignments
POST   /api/admin/plan-categories
GET    /api/admin/experts
```

---

## 關鍵交互特性

### 任務完成流程

```
1. 用戶點擊勾選框
   ↓
2. 脈衝動畫觸發
   ↓
3. 立即視覺反饋（背景變綠）
   ↓
4. 700ms 滑出動畫
   ↓
5. 300ms 數據庫同步
   ↓
6. 任務移至已完成區
   ↓
7. UndoToast 出現 (3-5 秒)
   ↓
8. 用戶可撤銷或繼續
```

### 任務操作菜單 (TaskActionMenu - Slice M)

**三種展示變體**：

1. **Mobile Swipe Reveal** (移動左滑)
   - 左滑任務卡片 → 展示隱藏按鈕
   - 選項：暫停、隱藏/歸檔、刪除
   - 限制：僅在過期/已完成任務顯示

2. **Desktop Hover Popover** (桌面懸停)
   - TaskHoverDots 組件顯示 ⋮ 按鈕
   - 鼠標懸停 100ms 後顯示
   - 點擊打開下拉菜單
   - 支援 Esc 鍵關閉、點擊外部關閉

3. **TaskDetailModal Footer** (詳情頁腳)
   - 三個按鈕並排顯示
   - 固定在模態底部

**操作選項**：
- **暫停 (Pause)**：習慣暫停期間不出現在今日行程，可稍後恢復
- **隱藏/歸檔 (Archive)**：習慣移至歸檔，後續不再顯示
- **刪除 (Delete)**：永久刪除，所有歷史記錄一起消失

**操作流程**：
```
用戶點擊操作
  ↓
確認對話框出現
  ↓
用戶確認
  ↓
PATCH /api/tasks/:id { status: 'paused'|'archived' }
或 DELETE /api/tasks/:id
  ↓
任務狀態更新
  ↓
parent 組件刷新任務列表
```

#### 相關組件
- `taskCard/TaskActionMenu.jsx` - 共享操作菜單邏輯
- `taskCard/TaskHoverDots.jsx` - 桌面懸停 ⋮ 按鈕
- `taskCard/SwipeReveal.jsx` - 移動左滑揭示

### 手勢控制

**左滑**（過期/已完成任務）：
- 展示 "暫停"、"隱藏"、"刪除" 按鈕
- TaskActionMenu (variant='swipe')

**右滑**（任何任務）：
- 立即反向操作（完成/撤銷）
- 無需菜單選擇

---

## 科學基礎

### 三大行為科學模型

#### 1. Tiny Habits (BJ Fogg)
- **Cue (錨點)**：生活觸發時刻
- **Behavior (行為)**：習慣本身
- **Celebration (慶祝)**：完成動畫和提示

#### 2. Atomic Habits (James Clear)
- **身份認同**：每個習慣綁定身份名稱
- **嚮往系統**：用戶定義個人目標

#### 3. Fogg Behavior Model
- **影響力 vs 可行性**：四象限分類
- **焦點地圖**：防止習慣過載

### 9 個 GENESIS+IO 健康面向

| 面向 | 代表習慣 |
|------|--------|
| 基因與腸道 | 益生菌、纖維攝入 |
| 環境 | 光線暴露、空氣品質 |
| 飲食 | 水分、蛋白質、卡路里 |
| 運動 | 有氧、力量、伸展 |
| 壓力與睡眠 | 冥想、睡眠時間 |
| 社交互動 | 連絡家人、社交活動 |
| 心靈 | 感恩、日誌、冥想 |
| 認知與智慧 | 學習、閱讀、謎題 |
| 職涯與平衡 | 技能提升、工作邊界 |

---

## 組件清單

### 頁面組件
- `MainApp.jsx` - 主應用協調器（路由、模態管理）
- `page.js` - Next.js 首頁
- `/admin/*` - 管理員頁面

### 視圖組件
- `DailyTasksSection.jsx` - 日常任務區域
- `DashboardDetailView.jsx` - 日曆詳情視圖
- `ManageView.jsx` - 管理視圖
- `StatsView.jsx` - 統計視圖（懶加載）
- `HabitCalendar.jsx` - 日曆控制器

### 任務組件
- `TaskCard.jsx` - 單個任務卡片（含完成動畫）
- `TaskFormModal.jsx` - 任務創建/編輯
- `TaskDetailModal.jsx` - 任務詳情查看（含科學洞察）
- `TaskLibraryModal.jsx` - 習慣庫瀏覽

### 任務卡片手勢和操作
- `taskCard/SwipeReveal.jsx` - 移動左/右滑手勢
- `taskCard/TaskHoverDots.jsx` - 桌面懸停 ⋮ 按鈕 + 彈出菜單
- `taskCard/TaskActionMenu.jsx` - 共享操作菜單（3 種變體：swipe/popover/footer）

### 模板和習慣組件
- `TemplateExplorer.jsx` - 計劃模板瀏覽器
- `TemplateDetailPanel.jsx` - 計劃詳情和加入按鈕
- `RecommendationCardRow.jsx` - 個人化推薦行
- `PlanGroup.jsx` - 計劃分組組件

### 焦點地圖和評分
- `FocusMapModal.jsx` - 焦點地圖主模態
- `FocusMapBanner.jsx` - 焦點地圖橫幅提示
- `focusMap/MiniMap.jsx` - 象限摘要視圖
- `focusMap/QuadrantSection.jsx` - 象限詳情行

### 統計組件
- `stats/StreakHero.jsx` - 連續記錄展示
- `stats/CompletionRateCards.jsx` - 完成率卡片
- `stats/DomainBreakdownChart.jsx` - 領域分佈圓餅圖
- `stats/WeeklyHeatmap.jsx` - 12 週熱力圖
- `stats/TaskStreakList.jsx` - 頂級任務排行

### 日曆組件
- `calendar/MonthView.jsx` - 月視圖網格
- `calendar/WeekView.jsx` - 週視圖
- `calendar/CalendarTaskChip.jsx` - 日曆中的任務芯片

### 個人資料和嚮往組件
- `ProfileModal.jsx` - 檔案設定（2 個標籤）
- `profile/MyAspirationsTab.jsx` - 我的嚮往管理標籤
- `AspirationPicker.jsx` - 嚮往選擇（Step 1）
- `AspirationRecommendationPanel.jsx` - 嚮往推薦（Step 2-3）

### 科學洞察組件
- `insights/HabitInsightSection.jsx` - 習慣洞察展示（可展開卡片）

### 探索和發現組件
- `explore/HabitListView.jsx` - 習慣列表（含洞察）
- `explore/DomainGrid.jsx` - 9 領域網格選擇
- `explore/AnchorPicker.jsx` - 錨點/生活時刻選擇
- `explore/IdentityPicker.jsx` - 身份名稱選擇
- `explore/CategoryIcon.jsx` - 分類圖標渲染
- `explore/LUCIDE_ICONS.js` - Lucide 圖標對應表

### 導航和佈局組件
- `AppHeader.jsx` - 應用頭部
- `BottomTabBar.jsx` - 移動底部導航（md 以下隱藏）
- `SidebarNavigation.jsx` - 桌面側邊欄導航（md 以上顯示）
- `DashboardSummaryCard.jsx` - 儀表板摘要卡片

### 身份驗證和模態
- `LoginModal.jsx` - 登錄/註冊
- `LockedTaskAlert.jsx` - 鎖定任務警告

### 通知和反饋
- `UndoToast.jsx` - 撤銷通知提示（3-5 秒）

### 工具組件
- `Avatar.jsx` - 化身渲染
- `IconRenderer.jsx` - 圖標渲染工具
- `MaterialIcon.jsx` - 物質設計圖標
- `ErrorBoundary.jsx` - 錯誤邊界

### 工具函數庫
- `lib/utils.js` - 日期、計算、CSS 工具
- `lib/constants.js` - 常數（分類、圖標配置）
- `lib/anchors.js` - 錨點定義（生活時刻）
- `lib/avatars.jsx` - 化身定義和配置
- `lib/subtasks.js` - 子任務邏輯
- `lib/focusMap.js` - 象限分類邏輯
- `lib/aspirations.js` - 嚮往過濾和預設邏輯
- `lib/stats.js` - 統計計算（連續記錄、熱力圖等）
- `lib/templateRecommendation.js` - 模板推薦邏輯
- `lib/sleepTypeKeys.js` - 睡眠類型設定

### 自訂 Hooks
- `useTaskManagement.js` - 任務狀態和操作（核心 Hook）

---

## 常見用戶故事

### 故事 1：新用戶開始旅程

```
1. Anna 註冊，選擇 Rose + Stress 型
2. 系統推薦適合的計劃
3. 定義嚮往："改善睡眠質量"
4. 加入 "14 天睡眠恢復計劃"
5. 評估習慣，激活 3 個
6. 開始日常打卡
```

### 故事 2：現有用戶加入新計劃

```
1. Tom 使用 1 個月後
2. 瀏覽 "運動與肌力" 模板
3. 選擇 "進階" 難度，明天開始
4. 評估 8 個新習慣，激活 2-3 個
5. 下週評估並激活更多
```

### 故事 3：按嚮往調整習慣

```
1. Sarah 創建 "提升心理健康" 嚮往
2. 系統推薦相關習慣和計劃
3. 加入 "正念計劃"
4. 30 天後標記嚮往為 "已達成"
```

---

## 快速參考

### 開發命令
```bash
npm run dev          # 啟動開發伺服器
npm test             # 運行測試
npm run build        # 構建生產版本
npx prisma db push  # 同步數據庫
```

### 常見文件位置
- 頁面：`/src/app/`
- 組件：`/src/components/`
- API：`/src/app/api/`
- 工具：`/src/lib/`
- 測試：`/src/__tests__/`
- 數據庫：`/prisma/schema.prisma`

---

**最後更新**：2026-06-01
