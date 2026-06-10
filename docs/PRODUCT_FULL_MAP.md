# HabitNext — 完整產品全景 (Real Full Map)

> 包含**代碼中的所有隱藏功能**的真實產品全景。
> 融合已實現 + 未文檔化 + 進行中的功能，形成完整的產品願景。

最後更新：2026-06-10

---

## 1. 完整使用者分群 (Extended Personas)

### Persona 1: 個人使用者 — 「自主改變者」(Self-Optimizer)

**使用者旅程中的功能觸點**：

**第 1-3 天**（建立基礎）
- 選擇「嚮往」(Aspiration) — 定義大目標（例：「我要成為健康的人」）
- 系統根據嚮往推薦習慣 + 計畫
- 設定分型（花朵型 / 睡眠型）

**第 4-7 天**（開始行動）
- 每日打卡（Binary / Quantitative / Checklist 三類）
- 城市世界視覺化反饋（完成 5 項 → village 升級）

**第 2-4 週**（檢視進度）
- Stats 頁（完成率 + Streak + 9 域分布 + 週熱力圖）
- 成就中心（解鎖徽章 🏆）
- 旅程世界（看城市成長）

**第 1 個月後**（優化調整）
- Focus Map — 評估哪些習慣最值得做（Impact × Ability）
- 習慣科學簡報（知道為什麼做這個習慣）
- 調整身分認同 / 難度

---

### Persona 2: 專業人士 — 「教練型使用者」

**新增功能**：
- 查看客戶的旅程世界進度
- 管理客戶的「嚮往」（大目標）
- 查看科學證據評分（推薦習慣的強度）
- 導入客戶的習慣洞察（科學簡報）

---

### Persona 3: 內容編輯 — 「計畫設計者」

**新增功能**：
- 為習慣撰寫科學簡報（習慣洞察）
- 管理習慣的科學證據強度
- 上傳論文 abstract，AI 自動生成初稿簡報

---

## 2. 完整功能地圖（按體驗層）

### 一級功能 — 核心習慣追蹤

```
┌─────────────────────────────────────────┐
│           每日打卡核心迴圈               │
├─────────────────────────────────────────┤
│ 1. 進入 DailyView                       │
│    ├─ 今日行程列表（按 cue 分組）       │
│    ├─ 健康分數卡（進度環形）            │
│    └─ 週期目標進度                      │
│                                         │
│ 2. 標記完成                             │
│    ├─ Binary (勾選)                     │
│    ├─ Quantitative (計數)               │
│    └─ Checklist (子任務)                │
│                                         │
│ 3. 即時反饋                             │
│    ├─ 綠色打勾 + 音效                   │
│    ├─ 進度環實時更新                    │
│    └─ 🔥 Streak 信號（連續紀錄）        │
└─────────────────────────────────────────┘
```

---

### 二級功能 — 習慣發現 & 承諾

```
┌─────────────────────────────────────────┐
│         習慣 → 錨點 → 身分 → 承諾        │
├─────────────────────────────────────────┤
│                                         │
│ A. 從「嚮往」開始 ⭐ 新                 │
│    ↓                                   │
│    「我想成為一個健康的人」             │
│    ↓                                   │
│    系統推薦 10 個習慣（基於嚮往）       │
│                                         │
│ B. 從習慣庫瀏覽                         │
│    ↓                                   │
│    9 個 GENESIS+IO 域 → 105 習慣         │
│    ↓                                   │
│    選難度（入門 / 進階 / 挑戰）          │
│                                         │
│ C. 焦點地圖評估 ⭐ 新                   │
│    ↓                                   │
│    Impact × Ability 2D 篩選             │
│    ↓                                   │
│    🌟 黃金行為 / 🌱 順手習慣 / ⏳ 大魚  │
│                                         │
│ D. 科學簡報 ⭐ 新                       │
│    ↓                                   │
│    「為什麼要做這個習慣？」(論文證據)    │
│    ├─ 標題 + 摘要                      │
│    ├─ 詳細解釋 + 限制                  │
│    ├─ 行動建議                        │
│    └─ 證據強度（Strong / Moderate）    │
│                                         │
│ E. 加入習慣                             │
│    ↓                                   │
│    選錨點 (早餐後 / 自訂 / 既有 task)   │
│    ↓                                   │
│    選身分 (推薦 / 通用 / 自訂)          │
│    ↓                                   │
│    ✓ 習慣加入，出現在每日清單           │
│                                         │
└─────────────────────────────────────────┘
```

---

### 三級功能 — 計畫訂閱 (Template System)

```
┌──────────────────────────────────────────┐
│      計畫探索 → 詳細 → 加入 → Pre-bake   │
├──────────────────────────────────────────┤
│                                          │
│ 1. TemplateExplorer Modal                │
│    ├─ 花朵型課程（4 個，14 天 × 4 phase）│
│    ├─ 睡眠處方（4 個，14 天）            │
│    └─ 其他計畫                          │
│                                          │
│ 2. TemplateDetailPanel                   │
│    ├─ 4 個 phase 詳細內容                │
│    ├─ 每個 task 的 cue + identity       │
│    ├─ 科學簡報（為什麼選這個計畫）      │
│    └─ 「加入」CTA                       │
│                                          │
│ 3. 選開始日期                            │
│    ├─ 今天 / 明天 / 自訂                 │
│                                          │
│ 4. Pre-bake 所有 task                    │
│    └─ 14 天的 task 自動建立              │
│                                          │
└──────────────────────────────────────────┘
```

---

### 四級功能 — 統計 & 反思

```
┌────────────────────────────────────────────┐
│        Stats → Insights → Optimization     │
├────────────────────────────────────────────┤
│                                            │
│ A. 統計頁 (StatsView)                      │
│    ├─ 完成率卡（今日/週/月）              │
│    ├─ 9 域分布（雷達圖/圓餅圖）           │
│    ├─ 連續紀錄英雄卡（🔥 streak）        │
│    ├─ 任務連續排行（Top 10）              │
│    └─ 週熱力圖（GitHub 風格）            │
│                                            │
│ B. 月曆 (HabitCalendar)                    │
│    ├─ 每日完成狀況視覺化                  │
│    └─ 點擊日期查詳細                      │
│                                            │
│ C. 旅程世界 ⭐ 新                         │
│    ├─ 首頁城市（最多完成的分類）          │
│    ├─ 其他城市（環形排列）                │
│    ├─ 城市分級（empty → megacity）       │
│    ├─ 建築視覺化（每 5 項完成一棟）      │
│    └─ 點擊城市看詳細（domain 統計）      │
│                                            │
│ D. 成就中心 ⭐ 新                         │
│    ├─ 已解鎖成就（emoji badge）          │
│    ├─ 進行中成就（進度條）                │
│    └─ 解鎖動畫慶祝                       │
│                                            │
└────────────────────────────────────────────┘
```

---

### 五級功能 — 進階最佳化

```
┌─────────────────────────────────────────┐
│      Focus Map → Evidence → AI Insights  │
├─────────────────────────────────────────┤
│                                         │
│ A. Focus Map ⭐ 新                      │
│    ├─ 在多個習慣候選中評估               │
│    ├─ Impact slider (1-5)               │
│    ├─ Ability slider (1-5)              │
│    ├─ 2D 象限：                         │
│    │  ├─ 🌟 黃金 (high/high) → 推薦    │
│    │  ├─ 🌱 順手 (low/high) → 可選     │
│    │  ├─ ⏳ 大魚 (high/low) → 延後     │
│    │  └─ 🗑️ 跳過 (low/low) → 別做    │
│    │                                   │
│    └─ Fogg Model 建議                   │
│                                         │
│ B. 科學證據強度 ⭐ 新                    │
│    ├─ 4 個評分維度：                    │
│    │  ├─ 研究類型（統合分析 → 專家意見） │
│    │  ├─ 對象規模（大型人體 → 動物）    │
│    │  ├─ 因果強度（介入 → 相關）        │
│    │  └─ 重複驗證（多研究 → 單一）      │
│    │                                   │
│    ├─ Tier：Strong / Moderate / Preliminary
│    └─ 在習慣詳細頁顯示                  │
│                                         │
│ C. 習慣科學簡報 ⭐ 新                    │
│    ├─ 來自論文摘要的自動生成             │
│    ├─ 標題（12-20 字）                  │
│    ├─ 摘要（80-150 字 + 關鍵數字）      │
│    ├─ 詳細（300-800 字 + 限制）         │
│    └─ 行動建議（15-40 字）              │
│                                         │
│ D. AI 習慣反思 （未來）                  │
│    └─ 每週對話式問卷判斷進度             │
│                                         │
└─────────────────────────────────────────┘
```

---

### 六級功能 — 社交 & 教練（未來）

```
┌──────────────────────────────────────────┐
│    教練工具 (Coach Dashboard) 🚧         │
├──────────────────────────────────────────┤
│                                          │
│ A. 客戶管理                              │
│    ├─ 客戶列表 + 進度                    │
│    ├─ 客戶的嚮望 (Aspiration)            │
│    └─ 客戶的城市世界進度                 │
│                                          │
│ B. 計畫分配                              │
│    └─ 給客戶推薦習慣 + 科學簡報           │
│                                          │
│ C. 推播通知 🚧                           │
│    ├─ 時段提醒（早餐後、午餐後…）       │
│    └─ 進度里程碑（7 天、14 天 慶祝）    │
│                                          │
│ D. 社群功能 (未來)                       │
│    ├─ 邀請朋友加入同一計畫               │
│    ├─ 排行榜 (Leaderboard)              │
│    └─ 群組挑戰                          │
│                                          │
└──────────────────────────────────────────┘
```

---

## 3. 完整產品架構圖

```
                    ┌─────────────────────┐
                    │   使用者進入 App    │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐
         │ 第一次   │  │ 日常     │  │ 檢視進度 │
         │ 設定     │  │ 打卡     │  │ 優化調整 │
         └──────────┘  └──────────┘  └──────────┘
              │              │              │
              ↓              ↓              ↓
         ┌──────────────────────────────────────┐
         │         習慣系統核心                  │
         │                                      │
         │  ┌─────────────────────────────────┐ │
         │  │ 嚮往 (Aspiration) ⭐           │ │
         │  │ ├─ 使用者大目標定義             │ │
         │  │ ├─ 推薦習慣 / 計畫              │ │
         │  │ └─ API: GET/POST/PATCH/DELETE │ │
         │  └─────────────────────────────────┘ │
         │                                      │
         │  ┌─────────────────────────────────┐ │
         │  │ 習慣庫 (OfficialHabit)         │ │
         │  │ ├─ 105 個推薦                  │ │
         │  │ ├─ 9 個 GENESIS+IO 分類        │ │
         │  │ ├─ 3 個難度級別                │ │
         │  │ └─ 科學簡報 ⭐                 │ │
         │  └─────────────────────────────────┘ │
         │                                      │
         │  ┌─────────────────────────────────┐ │
         │  │ 計畫模板 (Template)            │ │
         │  │ ├─ 花朵型 (4 個，14 天)         │ │
         │  │ ├─ 睡眠型 (4 個，14 天)         │ │
         │  │ ├─ Phase 結構化                │ │
         │  │ └─ Pre-bake 邏輯              │ │
         │  └─────────────────────────────────┘ │
         │                                      │
         │  ┌─────────────────────────────────┐ │
         │  │ 日常任務 (Task)                │ │
         │  │ ├─ Binary (是/否)              │ │
         │  │ ├─ Quantitative (計數)         │ │
         │  │ ├─ Checklist (多步驟)          │ │
         │  │ ├─ 錨點 (Cue)                  │ │
         │  │ └─ 身分認同 (Identity)         │ │
         │  └─────────────────────────────────┘ │
         │                                      │
         └──────────────────────────────────────┘
              │              │              │
         ┌────┴─────┬────────┴────┬────────┴──┐
         ▼          ▼             ▼           ▼
    ┌────────┐ ┌───────┐  ┌──────────┐ ┌──────────┐
    │ 統計頁 │ │旅程世 │  │ 成就中心 │ │Focus Map │
    │Stats  │ │界City │  │Achievement│ │Candidate │
    │       │ │World  │  │          │ │Evaluation│
    └────────┘ └───────┘  └──────────┘ └──────────┘
         │          │             │           │
         └──────────┴─────────────┴───────────┘
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
    ┌─────────────┐     ┌──────────────┐
    │ 推播通知    │     │ 教練工具     │
    │(未來)      │     │(未來)        │
    └─────────────┘     └──────────────┘
```

---

## 4. 按開發進度分類的功能矩陣

### 🟢 MVP 核心（第 1-4 週）

| 功能 | 狀態 | 工時 | 優先級 |
|---|---|---|---|
| User Auth (手機 + 密碼) | ✅ 完成 | 14h | P0 |
| Profile Setup (暱稱 + 頭貼) | ✅ 完成 | 6h | P0 |
| Task 管理 (Binary/Quant/Checklist) | ✅ 完成 | 16h | P0 |
| DailyView (清單 + 分組) | ✅ 完成 | 12h | P0 |
| 標記完成 (打勾 / ± / 子勾選) | ✅ 完成 | 14h | P0 |
| Stats 簡化版 (完成率 + streak) | ✅ 完成 | 16h | P1 |
| 習慣庫 (105 個 × 3 難度) | ✅ 完成 | 12h | P1 |
| 加入習慣 (錨點 + 身分) | ✅ 完成 | 16h | P0 |
| **小計** | | **106h** | |

---

### 🟡 已啟用但不完整（需補完 UI 與種子數據 / 第 5-8 週）

| 功能 | 代碼 | 現狀 | 工時 | 優先級 |
|---|---|---|---|---|
| **Aspiration (嚮往)** | ✅ | 按鈕有，流程接線，需測 | +4h (測試優化) | P2 |
| **Achievement Center (成就)** | ✅ | 按鈕有，只顯示文字，無徽章/進度 | +12h (UI Polish + 動畫) | P2 |
| **Journey / World 視覺化** | ✅ | 按鈕有，只顯示「前往設定開啟」 | +20h (WorldOverview 完成 + 種子) | P2 |
| **Focus Map** | ✅ | 代碼完整但無 CTA，需啟用 | +6h (加入入口 + 條件邏輯) | P2 |
| **日期瀏覽** | ✅ | 代碼完整 | 0h (驗證可用) | P2 |
| **編輯/刪除習慣** | ✅ | 代碼完整 | 0h (驗證可用) | P2 |
| **計畫模板系統** | ✅ | 代碼完整 | 0h (驗證可用) | P2 |
| **小計** | | | **42h** | |

---

### 🔵 進行中（邏輯完整但需 UI / 第 9-12 週）

| 功能 | 狀態 | 工時 | 優先級 |
|---|---|---|---|
| Habit Insights (AI 科學簡報) | ✅ 邏輯完整 | +20h (管理 UI) | P2 |
| 生理期模式 (Menstrual Cycle) | ✅ 代碼完整 | 0h (開啟) | P1 |
| 推播通知 (時段 + 里程碑) | 50% | +15h | P2 |
| 教練端 Dashboard | 10% | +40h | P3 |
| 社群功能 (邀請 / 排行) | 0% | +30h | P3 |
| **小計** | | **105h** | |

---

### ⏸️ 待規劃（需 spec）

- AI 雙軌 Brainstorm (Gemini 生習慣對)
- AI Reflection (每週對話)
- 穿戴裝置整合 (Apple Health / Google Fit)
- 付費訂閱模式

---

## 5. 完整使用者旅程（包含隱藏功能）

### 第 0 天：註冊與初始化

```
1. 登入 → 2. 設定暱稱 + 頭貼
          → 3. 選分型 (花朵 / 睡眠，可選)
          → 4. 定義「嚮往」(Aspiration，可選) ⭐
```

### 第 1-3 天：探索與承諾

```
路線 A（從嚮往開始）⭐
  嚮往：「我想成為更健康的人」
    ↓
  系統推薦習慣 10 個（基於嚮往分類）
    ↓
  看每個習慣的「科學簡報」⭐（為什麼有用）
    ↓
  用 Focus Map ⭐ 評估 (Impact × Ability)
    ↓
  選黃金行為 3-5 個，加入

路線 B（從計畫開始）
  看計畫探索 carousel
    ↓
  選花朵型 或 睡眠型課程
    ↓
  看計畫詳細 (4 phases)
    ↓
  選開始日期
    ↓
  14 天任務自動建立
```

### 第 4-7 天：每日習慣迴圈

```
早上 8:00
  ↓
  開啟 App → DailyView
    ├─ 看今日行程 (按 cue 分組)
    ├─ 健康分數卡 (進度環)
    └─ 目標標籤
  ↓
  完成早餐相關習慣
    ├─ 喝水 (Quantitative: 0/250ml)
    ├─ 吃蛋白質 (Binary: ○)
    └─ 冥想 (Checklist: [ ] [ ] [ ])
  ↓
  點打勾 → 綠色反饋 ✓ + Streak 更新
  ↓
  午餐後、晚餐後重複
  ↓
  晚上看 Stats (完成率 + 連續紀錄)
```

### 第 2-4 週：檢視進度 & 優化

```
週末檢視：
  ├─ Stats 頁 (完成率/Streak/9 域分布/熱力圖)
  ├─ 旅程世界 ⭐ (看城市成長，village → town)
  ├─ 成就中心 ⭐ (解鎖徽章動畫)
  ├─ 月曆 (HabitCalendar，視覺化完成狀況)
  └─ Focus Map ⭐ (哪些習慣最值得堅持)

調整：
  ├─ 改難度（某習慣太難 → 降級）
  ├─ 改身分認同（更新自己的想像）
  └─ 淘汰低效習慣（用 Focus Map 評估）
```

### 第 1 個月後：深度反思

```
月檢視：
  ├─ 成就達成 (完成 30 天)
  ├─ 旅程里程碑 (城市升級 town → city)
  ├─ 閱讀科學簡報 ⭐ (深化對習慣的理解)
  └─ AI 反思 (未來：每週對話式進度評估)

重新設定：
  ├─ 升級難度或加入新習慣
  ├─ 參加群組挑戰 (未來社群)
  └─ 分享進度給教練 (未來教練工具)
```

---

## 6. 完整功能清單（按系統）

### 認證系統
- ✅ 手機 + 密碼登入
- ✅ 新用戶註冊
- ✅ Demo 快速登入（開發用）
- 🚧 教練 / 管理員認證

### 個人資料系統
- ✅ 暱稱 + 頭貼設定
- ✅ 分型選擇（花朵 / 睡眠，可延後）
- ✅ 嚮往定義 ⭐
- 🚧 個人設定（通知偏好、隱私）

### 習慣管理系統
- ✅ 105 個推薦習慣庫
- ✅ 3 難度級別
- ✅ 9 個 GENESIS+IO 分類
- ✅ 習慣科學簡報 ⭐（AI 自動生成或編輯）
- ✅ 證據強度評分 ⭐
- ✅ 加入新習慣（選錨點 + 身分）
- ✅ 編輯 / 刪除習慣
- ✅ 焦點地圖評估 ⭐

### 任務管理系統
- ✅ 三種任務類型：Binary / Quantitative / Checklist
- ✅ 每日打卡（實時 history）
- ✅ 每日重置 Checklist
- ✅ 日期瀏覽（預覽未來 / 查歷史）
- ✅ 編輯 / 刪除單一任務

### 計畫模板系統
- ✅ 計畫探索 (Carousel + 分類)
- ✅ 計畫詳細 (4 Phases 預覽)
- ✅ 加入計畫 (Pre-bake 邏輯)
- ✅ 花朵型課程（4 個，14 天）
- ✅ 睡眠型課程（4 個，14 天）
- 🚧 自訂計畫模板（未來）

### 統計與反思系統
- ✅ 完成率卡（今日 / 週 / 月）
- ✅ 連續紀錄英雄卡（🔥 streak）
- ✅ 9 域分布圖（雷達 / 圓餅）
- ✅ 任務連續排行（Top 10）
- ✅ 週熱力圖（GitHub 風格）
- ✅ 月曆視覺化（HabitCalendar）
- ✅ 旅程世界 ⭐（城市成長）
- ✅ 成就中心 ⭐（徽章解鎖）

### 社群與教練系統
- 🚧 教練客戶管理
- 🚧 推播通知（時段提醒）
- ⏸️ 群組挑戰 / 邀請朋友
- ⏸️ 排行榜
- 🚧 AI 週間反思對話

### 後台管理系統
- ✅ 習慣庫管理（CRUD）
- ✅ 計畫模板管理（CRUD）
- ✅ 分類管理（PlanCategory）
- ✅ 使用者列表查看
- 🚧 習慣洞察管理（科學簡報編輯）
- 🚧 專家 / 職稱管理

---

## 7. 完整技術架構

### 前端 Components（48 個，主要）

**核心流程**
- MainApp.jsx (主容器，管理所有 view)
- AppHeader.jsx (手機 header + 週列)
- SidebarNavigation.jsx (桌面側邊欄)

**Onboarding 流程**
- LoginModal.jsx
- ProfileModal.jsx

**探索階段**
- TemplateExplorer.jsx (計畫 carousel)
- TemplateDetailPanel.jsx (計畫詳細)
- TaskLibraryModal.jsx (習慣庫)
- AspirationPicker.jsx ⭐ (嚮往選擇)
- FocusMapModal.jsx ⭐ (Impact × Ability 評估)

**每日追蹤**
- DailyTasksSection.jsx (task 列表)
- TaskCard.jsx (單一 task 卡片)
- TaskDetailModal.jsx (task 詳細 / history)
- TaskFormModal.jsx (task 編輯)
- DashboardSummaryCard.jsx (健康分數卡)

**統計與反思**
- StatsView.jsx (統計容器)
- HabitCalendar.jsx (月曆)
- WorldOverview.jsx ⭐ (世界城市地圖)
- AchievementCenter.tsx ⭐ (成就中心)
- StreakCelebration.jsx (streak 慶祝)

**其他**
- Avatar.jsx, MaterialIcon.jsx, IconRenderer.jsx (UI 基礎)
- WeekStrip.jsx (週列互動)
- UndoToast.jsx (操作反饋)

---

### 後端 API（43 個端點）

**認證 (3)**
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/demo

**習慣與任務 (9)**
- GET/POST /api/tasks
- PATCH/DELETE /api/tasks/{id}
- PATCH /api/tasks/{id}/subtasks/{subtaskId}
- GET /api/tasks/batch-rate ⭐
- GET /api/tasks/candidates ⭐
- GET /api/habits/{habitId}/insights ⭐

**計畫 (3)**
- GET /api/templates/public
- POST/GET /api/user/assignments

**嚮往系統 ⭐ (6)**
- GET/POST /api/aspirations
- PATCH/DELETE /api/aspirations/{id}
- POST /api/aspirations/{id}/habits
- GET /api/aspirations/{id}/recommendations

**統計與旅程 (2)**
- GET /api/stats
- GET /api/journey ⭐

**使用者 (3)**
- PATCH /api/user/profile
- PATCH /api/user/menstrual ⭐
- GET /api/plan-categories

**記憶系統 ⭐ (1)**
- PATCH /api/memory/{historyId}

**後台：數據管理 (10)**
- /api/admin/experts/*
- /api/admin/titles/* ⭐
- /api/admin/plan-categories/*
- /api/admin/templates/*
- /api/admin/assignments/*
- /api/admin/users

**後台：習慣管理 (4)**
- GET/CRUD /api/admin/habits
- POST /api/admin/habits/{habitId}/insights ⭐
- GET /api/admin/habits/insights/draft ⭐

**後台：認證 (2)**
- POST /api/admin/auth/login
- POST /api/admin/auth/register

---

### 資料庫模型（10 個）

- User (id, phone, password, typeKey, sleepTypeKey, nickname, ...)
- Task (id, userId, date, title, cue, identity, type, history, ...)
- Template (id, category, tasks, version, ...)
- PlanCategory (id, slug, name, color, icon, order, isSystem)
- OfficialHabit (id, category, title, difficulties, ...)
- Expert (id, email, password, isApproved, ...)
- **Aspiration** ⭐ (id, userId, title, description, ...)
- **AspirationHabit** ⭐ (aspirationId, taskId)
- **HabitInsight** ⭐ (id, habitId, title, summary, detail, tags, sourceUrl, ...)
- **Evidence** ⭐ (id, habitId, studyType, scale, causality, replication, tier)
- **Memory** ⭐ (id, userId, type, data, ...)
- **Title** ⭐ (id, name, description)

---

## 8. 三年產品願景（含隱藏功能）

### Year 1 — 基礎完善

**Year 1 Q1 (現在 - 7月)**
- ✅ MVP：認證 + 習慣庫 + 每日追蹤 + 基本統計

**Year 1 Q2 (8月 - 10月)**
- 🟡 啟用隱藏功能：Aspiration + Focus Map + Journey World + Achievement
- 🟡 補完習慣科學簡報 UI
- 🚧 推播通知（時段提醒）

**Year 1 Q3 (11月 - 1月)**
- 🚧 教練端 Beta（給 5-10 教練測試）
- 🚧 AI 每週反思對話

**Year 1 Q4 (2月 - 4月)**
- ✅ 教練工具正式上線
- 🚧 社群功能（邀請 / 排行）

### Year 2 — 擴張與整合

- AI 雙軌 Brainstorm（Gemini 生 100 個習慣對）
- 穿戴裝置整合（Apple Health / Google Fit）
- B2B 授權（健身房、診所）

### Year 3 — 生態建構

- 教練認證與培訓計畫
- 多語言支持
- 與健康保險 / 公司福祉計畫整合

---

## 9. 功能完成度矩陣（2026-06-10 實測）

### 已啟用但不完整的功能

| 功能 | 按鈕 | 代碼 | API | UI 完成度 | 狀態 | 需要做 |
|---|---|---|---|---|---|---|
| **Aspiration (嚮往)** | ✅ | ✅ 完整 | ✅ | ❓ 未測 | 🟡 初期 | 測試完整流程 |
| **Journey (旅程)** | ✅ | ✅ 完整 | ✅ | 🔴 骨架只 (「前往設定開啟」) | 🔴 骨架 | 完成 WorldOverview 視覺化 + 種子數據 |
| **Achievement (成就)** | ✅ | ✅ 完整 | ✅ | 🔴 只有文字 (無徽章/進度) | 🔴 非常初期 | UI Polish (徽章動畫 + 進度條) + 種子數據 |
| **Focus Map** | ❌ | ✅ | ✅ | ❌ 無 | ⏸️ 未啟用 | 加入 CTA + 條件檢查 (>= 5 candidates) |

### 未啟用的功能

| 功能 | 代碼檔案 | API | Component | 狀態 | 優先級 |
|---|---|---|---|---|---|
| **Habit Insights (科學簡報)** | habitInsightAI.js | ✅ (部分) | — | 🔴 無 UI | P2 |
| **Evidence Strength (證據評分)** | evidenceStrength.js | ✅ | — | 🔴 無 UI | P3 |
| **推播通知** | — | 50% | — | 🔴 骨架 | P2 |
| **教練 Dashboard** | — | 50% | — | ⏸️ 未啟用 | P3 |

---

## 10. 完整文件導覽

| 文件 | 用途 | 角色 |
|---|---|---|
| **PRODUCT_FULL_MAP.md** (本文件) | 完整產品全景（含隱藏功能） | PM, Designer, 所有角色 |
| PM_FULL_PICTURE.md | 原始產品願景 | PM, Designer, 投資人 |
| PM_MVP_STORIES.md | 18 個 User Story + AC | PM, Engineer, QA |
| MVP_SCOPE_DEFINITION.md | MVP 邊界 + KPI | PM, Tech Lead |
| UNDOCUMENTED_FEATURES.md | 代碼中的隱藏功能清單 | Engineer, PM |
| ARCHITECTURE.md | 技術細節（資料模型、API） | Engineer |
| README.md | 快速上手指南 | Engineer, Onboarding |

