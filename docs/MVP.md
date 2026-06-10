# HabitNext MVP — 完整定義

> **從 Full Picture 切割出第一版 MVP**  
> 包含：范圍、User Stories、AC (Given-When-Then)、工程師參考、代碼完成度

最後更新：2026-06-10（基於實測代碼狀態）

---

## Part 1: MVP 概覽

### 核心發現

| 項目 | 實際狀況 |
|---|---|
| **總功能數** | 18 項 |
| **已完成** | 14 項 ✅（認證、打卡、統計等） |
| **骨架待完成** | 4 項 🟡（成就、旅程、嚮往、焦點地圖） |
| **未啟用** | 0 項 |
| **原估工時** | 130h (5.5 周) |
| **實際工時** | **58h (2.5-3 周)** ⚡ |
| **節省** | **55%** |

### MVP 範圍（17 項故事）

#### ✅ 已完成的 14 項功能（0h，無需做）

**認證系統** (2 項)
- Story 1.1: 新使用者註冊 → API `POST /api/auth/register` 完整
- Story 1.2: 使用者登入 → API `POST /api/auth/login` 完整

**帳戶與個人化** (2 項)
- Story 2.1: 設定個人資料（暱稱 + 頭貼）→ `ProfileModal.jsx` 完整
- Story 2.2: 分型選擇（花朵/睡眠）→ dropdown selector 實現

**習慣探索** (2 項)
- Story 3.1: 瀏覽習慣庫（105 個 × 3 難度 × 9 域）→ `TaskLibraryModal.jsx` 完整
- Story 3.2: 瀏覽計畫模板（Carousel + detail）→ `TemplateExplorer.jsx` 完整

**加入習慣與計畫** (2 項)
- Story 4.1: 加入單一習慣（難度 → 錨點 → 身分）→ 完整流程已驗證
- Story 4.2: 加入計畫模板（Pre-bake）→ API + 邏輯完整

**每日追蹤** (3 項)
- Story 5.1: 查看每日行程（DailyView）→ `DailyTasksSection.jsx` 完整
- Story 5.2: 標記完成（Binary/Quantitative/Checklist）→ 三種都實現
- Story 5.3: 日期瀏覽（預覽未來/查歷史）→ `WeekStrip.jsx` 互動完整

**統計與洞察** (1 項)
- Story 6.1: 檢視統計（完成率 + Streak + 9 域 + 週熱力圖）→ 5 個 widget 都完成

**編輯與刪除** (2 項)
- Story 7.1: 編輯習慣內容 → `TaskFormModal.jsx` 完整
- Story 7.2: 刪除習慣 → API DELETE 完整

#### 🟡 新增必做的 4 項（42h，需完成 UI）

| # | 故事 | 代碼狀態 | 工時 | 說明 |
|---|---|---|---|---|
| **8.1** | **完成成就中心 UI** | 骨架有 | 12h | 按鈕、數據有；需徽章動畫 + 進度條 + 樣式 |
| **8.2** | **完成旅程世界** | 骨架有 | 20h | 邏輯完整；需 SVG 渲染 + 詳細頁 + 種子數據 |
| **8.3** | **驗證嚮往流程** | 接線完 | 4h | API 完整；需 E2E 測試 + 邊界修復 |
| **8.4** | **啟用焦點地圖** | 代碼完 | 6h | 邏輯完整；需加入入口 + Impact/Ability UI + 象限反饋 |

---

## Part 2: 完整 User Stories + AC（17 項全列）

### User Story 1.1: 新使用者註冊

```
身為「初次使用 HabitNext 的人」
我想要「用手機號碼和密碼快速註冊」
以便「開始追蹤習慣」
```

**AC 1.1.1: 進入註冊頁**
```gherkin
Given  使用者在首頁
When   點擊「註冊」按鈕
Then   顯示註冊表單，包含：國家代碼、手機號碼、密碼欄位
```

**AC 1.1.2: 驗證手機格式**
```gherkin
Given  使用者在註冊頁面
When   輸入手機號碼（例：09xxxxxxxx）點「確認」
Then   若格式正確 → 進入密碼設定
       若格式錯誤 → 顯示提示「請輸入有效手機號碼」
```

**AC 1.1.3: 建立帳戶**
```gherkin
Given  使用者在密碼頁面
When   輸入 8 字元以上密碼，點「建立帳戶」
Then   系統用 bcrypt 加密，建立 User row
       顯示「註冊成功！」，導向登入頁面
```

**AC 1.1.4: 重複檢查**
```gherkin
Given  系統已有使用者 A（手機：0912345678）
When   使用者 B 用同一手機號註冊
Then   顯示「此手機號碼已被使用」，不允許註冊
```

---

### User Story 1.2: 使用者登入

```
身為「已註冊的 HabitNext 使用者」
我想要「用手機號碼和密碼登入」
以便「查看我的習慣」
```

**AC 1.2.1: 進入登入頁**
```gherkin
Given  使用者未登入，在首頁
Then   顯示登入表單（手機、密碼欄位 + 登入按鈕）
```

**AC 1.2.2: 成功登入**
```gherkin
Given  使用者在登入頁面
When   輸入正確的手機 + 密碼，點「登入」
Then   系統驗證 bcrypt 密碼
       將 userId 存入 localStorage
       導向 DailyView
       顯示「歡迎回來」
```

**AC 1.2.3: 密碼錯誤**
```gherkin
When   輸入正確手機但密碼錯誤，點「登入」
Then   顯示紅色提示「手機號或密碼錯誤」
       不進行登入，保留輸入框內容
```

---

### User Story 2.1: 設定個人資料

```
身為「登入後的使用者」
我想要「編輯暱稱和選擇頭貼」
以便「個人化我的帳戶」
```

**AC 2.1.1: 打開個人資料 Modal**
```gherkin
Given  使用者在 AppHeader
When   點擊「個人資料」icon
Then   開啟 ProfileModal，顯示：暱稱、頭貼選擇、分型選項
```

**AC 2.1.2: 編輯暱稱**
```gherkin
Given  在 ProfileModal
When   改暱稱為「小王」，點「儲存」
Then   系統更新 User.nickname
       關閉 modal，AppHeader 立刻顯示新暱稱
```

**AC 2.1.3: 選擇頭貼**
```gherkin
Given  在 ProfileModal
When   點擊不同顏色的 avatar seed
Then   即時預覽新頭貼
When   點「儲存」
Then   系統更新 User.avatarSeed
       AppHeader 頭貼馬上更新
```

---

### User Story 2.2: 分型選擇

```
身為「新使用者」
我想要「選擇我的分型（花朵型/睡眠型）」
以便「收到個性化推薦」
```

**AC 2.2.1: 分型選項可見**
```gherkin
Given  使用者在 ProfileModal
Then   顯示兩個 dropdown：
       - 花朵型：雛菊、玫瑰、蘭花、向日葵
       - 睡眠型：壓力、節律、代謝失衡、荷爾蒙波動
```

**AC 2.2.2: 選擇並保存**
```gherkin
When   使用者選「雛菊型」，點「儲存」
Then   系統設定 User.typeKey = "daisy"
       TemplateExplorer 推薦「花朵型課程」為主
```

---

### User Story 3.1: 瀏覽習慣庫

```
身為「想加入習慣的使用者」
我想要「從 9 個健康面向瀏覽 105 個推薦習慣」
以便「找到適合的習慣」
```

**AC 3.1.1: 打開習慣庫**
```gherkin
Given  使用者在 DailyView
When   點擊「+ 新增」或「探索習慣」icon
Then   開啟 TaskLibraryModal
       顯示 9 個 HabitCategory 卡片（名稱、icon、習慣數）
```

**AC 3.1.2: 瀏覽單一分類**
```gherkin
Given  在習慣庫 modal
When   點擊「飲食」分類
Then   展開該分類，列出所有飲食習慣
       每個習慣有 3 個難度按鈕（入門、進階、挑戰）
```

**AC 3.1.3: 預覽習慣詳細**
```gherkin
Given  看到習慣列表
When   點擊習慣名稱
Then   顯示習慣詳細卡片：
       - 描述、為什麼重要
       - 3 個難度配置（dailyTarget、unit、subtasks）
```

**AC 3.1.4: 搜尋習慣**
```gherkin
Given  在習慣庫 modal
When   在搜尋框輸入「喝水」
Then   實時篩選，顯示相關習慣（「喝 8 杯水」、「喝綠茶」等）
```

---

### User Story 3.2: 瀏覽計畫模板

```
身為「想系統化改變的使用者」
我想要「瀏覽 HabitNext 推薦的計畫課程」
以便「一鍵加入整個計畫」
```

**AC 3.2.1: 打開計畫探索**
```gherkin
Given  使用者在 DailyView
When   點擊「探索計畫」icon
Then   開啟 TemplateExplorer modal
       水平 carousel 顯示計畫卡片（花朵型、睡眠型、其他）
```

**AC 3.2.2: 滑動 Carousel**
```gherkin
Given  看到計畫 carousel
When   向右滑或點下一個箭頭
Then   平滑滑動，顯示下一張卡片
       可看到下一張卡片的 peek（20% visible）
```

**AC 3.2.3: 檢視計畫詳細**
```gherkin
Given  看到計畫卡片
When   點擊某計畫（例：「雛菊型·14 天課程」）
Then   滑入 TemplateDetailPanel
       顯示：計畫名稱、描述、4 個 phase 詳細內容、「加入計畫」按鈕
```

---

### User Story 4.1: 加入單一習慣

```
身為「決定要培養某個習慣的使用者」
我想要「選擇難度、錨點、身分後加入習慣」
以便「習慣出現在每日清單」
```

**AC 4.1.1: 選擇難度**
```gherkin
Given  在習慣詳細卡片（例：「早餐吃蛋白質」）
When   點擊「進階」難度
Then   顯示該難度的 dailyTarget（例：50g）
       按鈕 highlighted（綠色底），顯示「下一步：選擇錨點」
```

**AC 4.1.2: 選擇錨點**
```gherkin
Given  選了難度
When   進入 AnchorPicker
Then   顯示 3 個選項：
       1. 從既有 task 選（例：「午餐後」）
       2. 從 30 個內建時刻選（例：「早餐後」「刷牙後」）
       3. 自訂（例：「洗澡前」）
```

**AC 4.1.3: 選擇身分宣告**
```gherkin
Given  選了錨點
When   進入 IdentityPicker
Then   顯示 4 層身分：
       1. 推薦（基於 category）
       2. 通用 4 個
       3. 自訂輸入框
       4. 無（空值）
```

**AC 4.1.4: 建立 Task**
```gherkin
Given  完成難度 + 錨點 + 身分選擇
When   點擊「新增習慣」
Then   系統 POST /api/tasks
       建立 Task row（userId, title, cue, identity, type, date, history）
       modal 關閉，新 task 立刻出現在 DailyView
       顯示「習慣已加入！」toast
```

---

### User Story 4.2: 加入計畫模板

```
身為「想完整改變的使用者」
我想要「選擇開始日期後一鍵加入整個計畫」
以便「系統預先建立好所有任務」
```

**AC 4.2.1: 選擇開始日期**
```gherkin
Given  在 TemplateDetailPanel
When   點擊「加入計畫」按鈕
Then   開啟日期選擇 modal
       顯示：「今天開始」、「明天開始」、「自訂日期」
```

**AC 4.2.2: Pre-bake 所有 Task**
```gherkin
Given  選了開始日期
When   點擊「確認」
Then   系統 POST /api/user/assignments
       根據 Template.tasks（phase 結構）計算每天的日期
       為所有 14 天建立 Task row
```

**AC 4.2.3: 驗證計畫已加入**
```gherkin
Given  計畫加入完成
When   回到 DailyView
Then   列表顯示新的 task 項目
       頂部顯示「你在進行《雛菊型課程》」
       可查看「14 天中已完成 0 天」
```

---

### User Story 5.1: 查看每日行程

```
身為「每天打開 app 的使用者」
我想要「一眼看到今天要做的所有習慣」
以便「快速完成追蹤」
```

**AC 5.1.1: DailyView 顯示今日 Task**
```gherkin
Given  使用者登入，當前日期 = 2026-06-10
When   進入 DailyView
Then   系統查詢 Task WHERE userId=XXX AND date='2026-06-10'
       列出所有今日 task，每張卡片顯示：
       - 完成圓圈（○ 未完成 / ✓ 已完成）
       - Cue：「早餐後」
       - Title：「吃蛋白質」
       - Identity：「我是照顧身體營養的人」（小字灰色）
       - 難度 badge
       - 進度條（若 quantitative）
```

**AC 5.1.2: 分組顯示**
```gherkin
Given  使用者有 8 個 task（3 個早餐後，2 個午餐後，3 個晚餐後）
When   DailyView 渲染
Then   分組顯示：
       📍 早餐後 (3)
       ├─ 喝溫水
       ├─ 吃蛋白質
       └─ ...
```

**AC 5.1.3: 健康分數卡**
```gherkin
Given  使用者完成 5/8 task
Then   頂部顯示 DashboardSummaryCard：
       - 圓形環形進度表（5/8）
       - 完成百分比：「62%」
       - 文字：「今日健康分數」
```

---

### User Story 5.2: 標記習慣完成

```
身為「完成了某個習慣的使用者」
我想要「點擊打勾快速紀錄」
以便「習慣立刻變成綠色，看到進度更新」
```

**AC 5.2.1: Binary 任務點擊完成**
```gherkin
Given  看到 Binary task 卡片（例：「冥想 10 分鐘」）
       顯示未完成（白色圓圈 ○）
When   點擊圓圈
Then   系統 PATCH /api/tasks/{taskId}
       更新 task.history[今天] = { completed: true }
       UI 即時變綠色 ✓
       DashboardSummaryCard 環形進度 +1
```

**AC 5.2.2: Quantitative 任務增加數值**
```gherkin
Given  看到 Quantitative task（「喝水」，目標 250ml）
       progress bar 顯示 0/250ml
When   點擊「+」按鈕 3 次
Then   每次 PATCH /api/tasks/{taskId}，遞增 value += 50
       history[今天] = { value: 150 }
       progress bar 更新：「150/250ml」
When   value >= dailyTarget
Then   卡片變綠色 ✓，toast 「🎉 今日目標達成！」
```

**AC 5.2.3: Checklist 任務勾選子項**
```gherkin
Given  看到 Checklist task（「每餐都要吃蛋白質」）
       subtasks = [早餐, 午餐, 晚餐]
When   點擊「早餐」的勾選框
Then   系統更新 history[今天] = { subtaskCompletions: {breakfast: true} }
       早餐項目變綠 ✓，progress bar 「1/3」
When   全部 subtask 都勾選
Then   task 自動標記 completed=true，卡片變綠 ✓
```

**AC 5.2.4: 取消完成**
```gherkin
Given  已完成某 task，顯示綠色 ✓
When   再次點擊圓圈
Then   系統重置 history[今天] = { completed: false }
       UI 變回白色 ○
       DashboardSummaryCard 環形進度 -1
```

---

### User Story 5.3: 日期瀏覽

```
身為「想規劃未來或回顧過去的使用者」
我想要「點擊週列的其他日期，看那一天的計畫」
以便「預覽未來計畫或檢視過去完成情況」
```

**AC 5.3.1: 選擇未來日期**
```gherkin
Given  今天 = 2026-06-10，在 DailyView
When   點擊週列的「2026-06-12」（未來）
Then   系統設定 selectedDate = "2026-06-12"
       列表顯示該日期的 task，卡片變灰色（禁用互動）
       頂部顯示「🔒 你在預覽未來計畫」
       task 如未 pre-bake，顯示「計畫中」（虛線邊框）
```

**AC 5.3.2: 選擇過去日期**
```gherkin
When   點擊「2026-06-05」（過去）
Then   系統設定 selectedDate = "2026-06-05"
       列表顯示該日期的 task + history
       history 記錄該日期的完成狀態（綠 ✓ / 灰 ○）
       卡片禁用互動（唯讀）
```

**AC 5.3.3: 回到今日**
```gherkin
Given  在預覽或回顧模式
When   點擊週列的「今天」或「今日」按鈕
Then   系統設定 selectedDate = today
       DailyView 恢復正常互動模式（可打勾）
       DashboardSummaryCard 重新顯示
```

---

### User Story 6.1: 檢視統計

```
身為「想知道自己進度的使用者」
我想要「看到週/月完成率卡片、連續紀錄、9 域分布、週熱力圖」
以便「了解整體表現，取得成就感」
```

**AC 6.1.1: 進入統計頁**
```gherkin
Given  使用者在 DailyView
When   點擊「統計」icon
Then   開啟 StatsView（可能是 modal 或頁面切換）
       dynamic import stats components
```

**AC 6.1.2: 顯示完成率卡**
```gherkin
Given  在 StatsView
Then   顯示 CompletionRateCards widget：
       📊 完成率
       ├─ 今日：62% (5/8)
       ├─ 週均：58%
       └─ 月均：55%
```

**AC 6.1.3: 顯示連續紀錄**
```gherkin
Given  使用者已打卡 7 天連續
Then   顯示 StreakHero widget：
       🔥 連續 7 天
       太棒了！加油！
       目標：破紀錄 30 天
```

**AC 6.1.4: 任務連續排行**
```gherkin
Then   顯示 TaskStreakList widget：
       🏆 任務連續排行
       ├─ 1️⃣ 喝水 - 12 天
       ├─ 2️⃣ 冥想 - 8 天
       └─ 3️⃣ 運動 - 5 天
```

---

### User Story 7.1: 編輯習慣內容

```
身為「想調整習慣的使用者」
我想要「編輯習慣的目標或描述」
以便「不用刪除重建」
```

**AC 7.1.1: 進入編輯模式**
```gherkin
Given  看到任務卡片
When   點擊卡片本身（非圓圈）
Then   開啟 TaskDetailModal
       顯示完整資訊 + 「編輯」按鈕
When   點擊「編輯」
Then   進入 TaskFormModal，所有欄位可編輯
```

**AC 7.1.2: 修改目標值**
```gherkin
Given  編輯 Quantitative task（「喝水」，目標 250ml）
When   改目標為 350ml，點「保存」
Then   系統 PATCH /api/tasks/{taskId}
       更新 task.dailyTarget = 350
       modal 關閉，卡片即時反映新目標
```

**AC 7.1.3: 修改身分**
```gherkin
When   點擊 Identity 欄位
Then   開啟 IdentityPicker
When   改為「我是珍惜身體的人」，點「保存」
Then   系統更新 task.identity
       DailyView 卡片立刻顯示新身分
```

---

### User Story 7.2: 刪除習慣

```
身為「不想繼續某個習慣的使用者」
我想要「刪除該習慣」
以便「它不再出現在每日清單」
```

**AC 7.2.1: 刪除確認**
```gherkin
Given  在 TaskDetailModal
When   點擊「刪除」按鈕
Then   顯示確認 modal：
       「確定要刪除『喝水』嗎？歷史紀錄也會刪除。」
       [取消] [確定刪除]
When   點擊「確定刪除」
Then   系統 DELETE /api/tasks/{taskId}
       Task row 從 DB 刪除
       DailyView 列表移除該卡片
       toast 「習慣已刪除」
```

**AC 7.2.2: 刪除後 history 清除**
```gherkin
Given  Task 已有 30 天 history 紀錄
When   系統執行 DELETE
Then   task.history 所有資料也被清除
       使用者無法再查看該 task 的過去完成情況
```

---

### User Story 8.1: 完成成就中心 UI

```
身為「想看自己成就的使用者」
我想要「看到漂亮的成就徽章和進度條」
以便「感受達成感和激勵」
```

#### AC 8.1.1: 成就卡片布局

```gherkin
Given  使用者點擊 Sidebar 的「成就」按鈕
When   頁面加載成就頁面
Then   系統顯示成就卡片網格，每張卡片包含：
       ├─ Emoji 徽章（50×50px，有漸層背景色）
       ├─ 成就名稱（14pt bold, gray-900）
       ├─ 成就描述（12pt, gray-600, 最多 2 行）
       ├─ 解鎖狀態或進度條
       └─ 網格排列：1 列 (手機) / 2 列 (桌面)
```

#### AC 8.1.2: 解鎖動畫

```gherkin
Given  使用者完成任務導致成就解鎖
When   成就狀態從 unlocked=false 變 true
Then   系統播放 600ms 解鎖動畫：
       ├─ 0-200ms：Emoji scale 1→1.3，背景色閃爍
       ├─ 200-400ms：scale 1.3→0.95，邊框變綠
       └─ 400-600ms：scale 0.95→1，邊框穩定綠色
And    卡片 z-index 短暫提升（視覺層次）
```

#### AC 8.1.3: 進度條

```gherkin
Given  使用者未解鎖某成就（progress < requirement）
When   成就卡片渲染
Then   系統顯示進度條：
       ├─ 背景灰色條（100% 寬）
       ├─ 前景色條（width = progress/requirement）
       └─ 百分比文字（右上, 12pt gray-600）
```

#### AC 8.1.4: 頁面統計摘要

```gherkin
Given  成就頁面頂部
Then   系統顯示：
       ├─ 標題：「🏆 成就中心」（24pt bold）
       ├─ 「已解鎖 X / Y 個成就」（X 用翠綠 #169E6B）
       └─ 整體進度環形（0 → final width，800ms 動畫）
And    當解鎖全部時，顯示「恭喜！解鎖全部成就！🎉」
```

---

### User Story 8.2: 完成旅程世界

```
身為「想看習慣進度的使用者」
我想要「看到我的城市世界成長」
以便「感受具體的成就感和進度」
```

#### AC 8.2.1: 進入旅程頁面

```gherkin
Given  使用者在 Sidebar 點「旅程」按鈕
When   頁面切換到 journey view
Then   系統調用 GET /api/journey?userId={userId}
And    顯示 WorldOverview SVG（skeleton 加載中）
```

#### AC 8.2.2: 世界地圖 SVG 渲染

```gherkin
Given  使用者進入旅程頁面，數據已載入
When   WorldOverview 組件初始化
Then   系統在 SVG canvas (360×280px) 渲染：
       ├─ 背景：橢圓 (淡綠 #dff1ea，邊框 #bfe3d9)
       ├─ 主城市（中心）：
       │  ├─ 半徑 = min(10 + sqrt(total)×3, 34)
       │  ├─ 填充：深綠 #0d9488
       │  └─ 白色光暈 @ 22% radius
       └─ 副城市（環形）：
          ├─ 角度 = (i-1)/(count-1) × 2π - π/2
          ├─ 距離 = 92px (y 軸縮放 0.62)
          ├─ 填充：淺綠 #34b3a6
          └─ 城市標籤（名稱 + 統計數）
```

#### AC 8.2.3: 互動——點擊城市

```gherkin
Given  使用者看到世界地圖
When   使用者點擊任一城市圓圈
Then   系統切換到該城市的詳細視圖：
       ├─ 標題：「{城市名稱}」
       ├─ 統計：「完成 X 個任務」
       ├─ Domain 分佈表格（按任務數降序）
       ├─ 建築視覽化（Flagship + 普通建築 + Generic 房子）
       └─ 「← 返回世界地圖」按鈕
```

#### AC 8.2.4: 城市升級提示

```gherkin
Given  使用者完成任務，城市總數達到升級閾值
When   完成數 >= 閾值 (1→village, 10→town, 30→city, 80→metropolis, 200→megacity)
Then   系統顯示升級通知：「✨ 升級為 {新等級}」
And    城市半徑 smooth expand (300ms 動畫)
```

#### AC 8.2.5: 種子數據

```gherkin
Given  使用者剛好沒有任何完成任務
When   調用 GET /api/journey
Then   系統返回模擬數據：
       ├─ 至少 3 個城市
       ├─ 每個城市 5-20 個完成任務
       ├─ Domain 均勻分佈
       └─ 包含不同等級 (village, town, city)
```

---

### User Story 8.3: 驗證嚮往流程

```
身為「想從大目標出發的使用者」
我想要「能夠定義嚮往並獲得推薦」
以便「找到符合我價值觀的習慣」
```

#### AC 8.3.1: 打開嚮往 Picker

```gherkin
Given  使用者在習慣庫 Modal，view === 'domain'
When   使用者看到「✨ 從嚮往開始」按鈕
       └─ 樣式：gradient (emerald-50 to white)，邊框 #C3FAE8
And    使用者點擊該按鈕
Then   系統調用 onOpenAspirationPicker()
And    MainApp 開啟 AspirationPicker modal
```

#### AC 8.3.2: 嚮往列表

```gherkin
Given  AspirationPicker modal 打開
When   調用 GET /api/aspirations?userId={userId}
Then   若有既有嚮往：列出所有嚮往卡片
       └─ 每張卡片：名稱 + 簡述，可點擊進入推薦視圖
And    若無嚮往：顯示「+ 新增嚮往」按鈕 + 引導文字
```

#### AC 8.3.3: 推薦視圖

```gherkin
Given  使用者選擇嚮往
When   系統調用 GET /api/aspirations/{aspirationId}/recommendations
Then   系統切換到 AspirationRecommendationPanel：
       ├─ 頂部：嚮往名稱 + 描述
       ├─ 推薦習慣列表（10 左右）
       │  └─ 習慣卡片：名稱 + 為何重要 + 難度 badge
       └─ 「← 返回」按鈕
```

#### AC 8.3.4: 完整流程

```gherkin
Given  使用者在推薦視圖選習慣
When   點擊習慣卡片
Then   系統進入原有的習慣選擇流程：
       ├─ Step 1: 選難度
       ├─ Step 2: AnchorPicker
       ├─ Step 3: IdentityPicker
       └─ Step 4: 建立 task + AspirationHabit 關聯
```

#### AC 8.3.5: 關聯建立

```gherkin
Given  使用者完成加入習慣
When   習慣被建立（POST /api/tasks）
Then   系統同時執行：
       ├─ POST /api/aspirations/{aspirationId}/habits
       ├─ 建立 AspirationHabit row
       └─ 習慣可在統計反溯到嚮往
And    顯示成功提示：「習慣已加入，綁定到嚮往『...』」
```

---

### User Story 8.4: 啟用焦點地圖

```
身為「想優先選擇習慣的使用者」
我想要「用 Impact × Ability 矩陣評估習慣」
以便「有系統地選擇最值得做的習慣」
```

#### AC 8.4.1: 打開焦點地圖

```gherkin
Given  使用者在習慣庫，看到多個習慣候選
When   使用者點擊「📊 用焦點地圖評估」按鈕
Then   系統開啟 FocusMapModal
       顯示習慣候選列表（最多 5-10 個）
```

#### AC 8.4.2: 評估單一習慣 - Impact 滑桿

```gherkin
Given  FocusMapModal 已打開，選中某習慣（例：「運動」）
When   用戶在 Impact 滑桿上調整 (1-5)
Then   系統即時更新：
       ├─ 滑桿位置（0-100% 寬）
       ├─ 標籤更新（低 → 中 → 高）
       └─ 2D 象限中的習慣位置實時移動
```

#### AC 8.4.3: 評估單一習慣 - Ability 滑桿

```gherkin
Given  Impact 已設定
When   用戶在 Ability 滑桿上調整 (1-5)
Then   系統即時更新：
       ├─ 滑桿位置（0-100% 寬）
       ├─ 標籤更新（難 → 中 → 易）
       └─ 2D 象限中的習慣位置實時移動
```

#### AC 8.4.4: 2D 象限視覺化

```gherkin
Given  Impact 和 Ability 都已設定
When   FocusMapModal 渲染
Then   系統顯示 2D 矩陣（400×400px）：
       ├─ X 軸（0-100）：Ability → 0=難，100=易
       ├─ Y 軸（0-100）：Impact → 0=低，100=高
       ├─ 4 個象限，各有標籤和顏色：
       │  ├─ 右上（易/高）：🌟 黃金行為 (emerald-500)
       │  ├─ 右下（易/低）：🌱 順手習慣 (blue-400)
       │  ├─ 左上（難/高）：⏳ 大魚 (amber-500)
       │  └─ 左下（難/低）：🗑️ 跳過 (red-300)
       └─ 習慣卡片在矩陣內浮動
```

#### AC 8.4.5: Fogg Model 建議

```gherkin
Given  習慣已評估並放置在象限
When   FocusMapModal 渲染
Then   系統在每個象限下顯示 Fogg Model 建議：
       ├─ 🌟 黃金：「最值得做！高效益、容易上手。現在就加入。」
       ├─ 🌱 順手：「容易做，但效益一般。可作為輔助習慣。」
       ├─ ⏳ 大魚：「高效益但難度大。應該先做入門級，再升級。」
       └─ 🗑️ 跳過：「低效益且難做。暫不建議。」
```

#### AC 8.4.6: 批量評估與保存

```gherkin
Given  使用者評估了 3-5 個習慣
When   點擊「確認選擇」或「加入黃金習慣」
Then   系統執行：
       ├─ 將所有「黃金」習慣批量加入（錨點 → 身分 → 確認）
       ├─ 儲存評估結果（Impact × Ability）
       └─ 顯示「已加入 X 個習慣」
And    modal 關閉，回到 DailyView
```

#### AC 8.4.7: 重新評估與切換

```gherkin
Given  使用者已進行過一次焦點地圖評估
When   再次點擊「焦點地圖」
Then   系統載入上次的評估結果：
       ├─ 習慣和滑桿位置恢復
       └─ 用戶可修改評估並再次保存
```

---

## Part 3: 工程師實現參考

### Story 8.1: 完成成就中心 UI (12h)

**代碼現狀**
- ✅ `components/AchievementCenter.tsx` 組件有
- ✅ `data/mockData.ts` 有 `achievementsData` (10+ 成就)
- ✅ Sidebar 「成就」按鈕有
- ❌ 徽章動畫、進度條樣式未完成

**工作項目**
| 工作 | 工時 | 檔案 | 詳細 |
|---|---|---|---|
| 徽章解鎖動畫 | 4h | `AchievementCenter.tsx` | scale 1→1.3→0.95→1、背景色閃爍、邊框變綠（Framer Motion） |
| 進度條 UI | 3h | `AchievementCenter.tsx` | 灰色背景 + 彩色前景 + 百分比（Tailwind） |
| 樣式 Polish | 5h | 整體 | 色彩協調（翠綠 #169E6B）、spacing、響應式（1 列手機、2 列桌面） |

---

### Story 8.2: 完成旅程世界視覺化 (20h)

**代碼現狀**
- ✅ `lib/journeyWorld.js` 邏輯完整
- ✅ `components/journey/WorldOverview.jsx` 有
- ✅ Sidebar 「旅程」按鈕有、API `GET /api/journey` 有
- ❌ 頁面只顯示「前往設定開啟」
- ❌ SVG 渲染、種子數據未準備

**工作項目**
| 工作 | 工時 | 檔案 | 詳細 |
|---|---|---|---|
| WorldOverview SVG 渲染 | 5h | `WorldOverview.jsx` | 背景橢圓、主城市中心、副城市環形、標籤 + 統計 |
| 城市詳細頁面 | 5h | `WorldOverview.jsx` | 點擊城市看 domain 分佈 + 建築視覺化 |
| 城市升級動畫 | 3h | `journeyWorld.js` | 完成數達閾值時 (1→10→30→80→200) 的升級通知 |
| 種子數據 | 3h | — | 3-5 個模擬城市，每個 5-20 個任務；確保有 village/town/city 等級 |
| 響應式 + Polish | 4h | 整體 | 手機 (360px) / 桌面 (1024px+) 自適應、無橫向滾動 |

---

### Story 8.3: 驗證嚮往流程 (4h)

**代碼現狀**
- ✅ `components/AspirationPicker.jsx` 完整
- ✅ `components/AspirationRecommendationPanel.jsx` 完整
- ✅ 所有 API endpoints 完整（`GET /api/aspirations/*`，`POST /api/aspirations/{id}/habits`）
- ✅ MainApp.jsx 已接線（`isAspirationPickerOpen`、「✨ 從嚮往開始」按鈕）
- ❌ E2E 使用者流程未測試

**工作項目**
| 工作 | 工時 | 詳細 |
|---|---|---|
| E2E 使用者流程測試 | 2h | 從點按鈕 → 選嚮往 → 看推薦 → 加入習慣 → 確認關聯 |
| API 邏輯驗證 | 1h | 確認 `POST /api/aspirations/{id}/habits` 成功、history 回溯 |
| 邊界情況 + 錯誤處理 | 1h | 空狀態、API 失敗降級、關聯失敗提示 |

---

### Story 8.4: 啟用焦點地圖 (6h)

**代碼現狀**
- ✅ `components/FocusMapModal.jsx` 組件有
- ✅ `lib/focusMap.js` 邏輯完整（象限計算、Fogg Model 建議）
- ✅ 相關 API endpoints 完整
- ❌ Impact/Ability 滑桿 UI 未完成
- ❌ 2D 象限視覺化未實現
- ❌ 入口按鈕未加入習慣庫

**工作項目**
| 工作 | 工時 | 檔案 | 詳細 |
|---|---|---|---|
| Impact/Ability 滑桿 UI | 2h | `FocusMapModal.jsx` | 雙滑桿組件、標籤、實時更新 (Tailwind) |
| 2D 象限視覺化 | 2h | `FocusMapModal.jsx` | SVG 或 Canvas 渲染、習慣位置計算、象限著色 |
| Fogg Model 建議文案 | 1h | `FocusMapModal.jsx` | 4 個象限的建議文案渲染 |
| 入口與流程接線 | 1h | `TaskLibraryModal.jsx` | 加入「焦點地圖」按鈕、modal 打開/關閉、批量加入邏輯 |

---

## Part 4: 工作量估算

### 詳細工時分解

| 層級 | 故事數 | 代碼狀態 | 工時 | 優先級 |
|---|---|---|---|---|
| **已完成** | 14 項 | ✅ 完成 | **0h** | Ready |
| **骨架待完成** | 4 項 | 🟡 部分 | **42h** | **P1** |
| **QA + 部署** | — | — | **12h** | **P1** |
| **緩衝** | — | — | **4h** | — |
| **總計** | | | **58h** | |

### 團隊規模

- **2 人工程師**：80h/人 × 2 周 = 160h 可用 → 預計 **14-18 天** ⚡
- **1 人工程師**：40h/周 × 3 周 = 120h 可用 → 預計 **3 周**

---

## Part 5: Sprint 規劃

### Week 1: 完成骨架 (38h)

**Day 1-2: Story 8.1 - 成就 UI** (12h)
- 徽章解鎖動畫實現 (4h)
- 進度條 UI 完成 (3h)
- 整體樣式 Polish (5h)

**Day 3-5: Story 8.2 - 旅程世界** (20h)
- WorldOverview SVG 渲染優化 (5h)
- 城市詳細頁面設計 (5h)
- 城市升級動畫 + 種子數據準備 (6h)
- 響應式設計 + Polish (4h)

**Day 5 下午: Story 8.4 - 焦點地圖入門** (6h)
- Impact/Ability 滑桿 UI (2h)
- 2D 象限視覺化 (2h)
- Fogg Model 建議 + 流程接線 (2h)

### Week 2: 驗證 + 優化 + 部署 (20h)

**Day 1: Story 8.3 - 嚮往驗證** (4h)
- E2E 使用者流程測試 (2h)
- API 邏輯驗證 (1h)
- 邊界情況修復 (1h)

**Day 2-3: Story 8.4 - 焦點地圖完善 + 8.1-8.3 細節** (8h)
- 焦點地圖交互優化 (3h)
- 成就/旅程/嚮往的邊界修復 (5h)

**Day 4-5: QA + 部署** (12h)
- 全功能回歸測試 (5h)
- 性能優化 (3h)
- 手機適配性檢查 (2h)
- 部署準備 (2h)

**預期上線：3 周內** ⚡

---

## Part 6: MVP 驗收清單

### 必達條件（Go/No-Go）

**Go 條件**（全部滿足才能發佈）
- [ ] 14 項已完成功能無 regression
- [ ] Story 8.1 / 8.2 / 8.3 / 8.4 AC 全數通過
- [ ] 無 critical/high bugs
- [ ] Crash rate < 0.5%
- [ ] D7 retention test ≥ 60%
- [ ] Lighthouse performance score ≥ 80
- [ ] 手機端無橫向滾動
- [ ] 所有動畫流暢 (60fps)

**No-Go 條件**（任一滿足則延期）
- ❌ 任何 critical bug
- ❌ Crash rate > 0.5%
- ❌ D7 retention < 50%
- ❌ 故事 AC 未全通過

### 成功指標

**激活指標** ✅ (已驗證)
- D1 Retention ≥ 80%
- Sign-up to First Task ≥ 60%

**新增指標**（4 個骨架功能）
- Achievement View 使用率 ≥ 40%
- Journey View 使用率 ≥ 35%
- Aspiration 採用率 ≥ 25%
- Focus Map 評估使用率 ≥ 30%

**留存指標** ✅ (已驗證)
- D7 Retention ≥ 60%
- D30 Retention ≥ 40%
- Daily Completion ≥ 60%

---

## Part 7: 快速啟動清單

### 工程師行動項

```
✅ 無需做（14 項已完成）
□ 驗證這 14 項無 regression（Story 1.1-7.2）
   → npm test (122 tests)
   → npm run dev (本地確認)

🟡 需完成（4 項，42h）
□ Story 8.1: 成就 UI (12h)
   → 改 AchievementCenter.tsx
   → 徽章動畫、進度條、樣式

□ Story 8.2: 旅程世界 (20h)
   → 改 WorldOverview.jsx + journeyWorld.js
   → SVG 渲染、詳細頁、升級、種子數據

□ Story 8.3: 嚮往驗證 (4h)
   → 執行 E2E 測試、修復邊界

□ Story 8.4: 焦點地圖 (6h)
   → 改 FocusMapModal.jsx + TaskLibraryModal.jsx
   → 滑桿 UI、象限視覺化、入口接線

✅ 部署前檢查
□ 所有 AC 通過
□ 無 console error
□ Lighthouse ≥ 80
```

---

## 總結

| 類別 | 內容 |
|---|---|
| **MVP 範圍** | 18 項故事：14 項已完成 ✅，4 項需完成 🟡 |
| **工時** | 58h（已完成 0h，新增 42h，QA 12h，緩衝 4h） |
| **Timeline** | 3 周（2-3 周取決於團隊規模） |
| **文件** | 18 個 Story AC、工程師參考、代碼位置、工時分解 |

**狀態**：Ready to build. 🚀
