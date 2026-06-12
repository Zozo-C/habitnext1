# HabitNext 後台 — 工程師快速指南

> **給後端工程師的實踐手冊**  
> 如果你想完整了解系統，先讀 `BACKEND_FULL_PICTURE.md`  
> 這份文檔幫助你快速找到開發起點  
> **版本**：2026-06-12  
> **狀態**：準備開發

---

## 快速開始

### 1. 環境設定

```bash
# 拉取 Vercel 環境變數
vercel env pull .env.local

# 啟動開發伺服器
npm run dev

# 推送 schema（若有修改）
cd web-app && npx prisma db push

# 種子官方習慣（一次性）
npm run seed
```

### 2. 當前 Status

- ✅ **Prisma Schema 完整**：所有 model 已定義（User、Task、TaskHistory、Template、Expert 等）
- ✅ **44 個 API routes 已存在**：見 `BACKEND_FULL_PICTURE.md` 第八部分
- ✅ **Pre-bake 邏輯已實現**：POST `/api/user/assignments` 自動生成任務
- 🟡 **前端整合度 60%**：後端 API 完整，前端缺 UI（嚮往、位置、美食等）

### 3. 開發主流程

```
你的任務 = 審查現有代碼 + 修復 bug + 實現缺失功能

Step 1: 讀現有 code
  → /web-app/src/app/api/* 查看已實現的 routes
  → /web-app/prisma/schema.prisma 理解 schema

Step 2: 與前端溝通需求
  → 前端準備了 14 個 UI 故事（見 MVP.md）
  → 對應你的 API endpoints（見下方速查表）

Step 3: 優先實現清單（由你自判）
  → Tier 1：認證、任務 CRUD、Pre-bake、統計（核心功能）
  → Tier 2：嚮往、位置、美食、科學佐證（豐富體驗）
  → Tier 3：推薦引擎、專家工作流（未來功能）

Step 4: 測試 & 部署
  → Jest unit tests（純函數邏輯）
  → E2E 測試（前端調用 API）
  → Vercel staging 環境
```

---

## 前後端對應表

### 前端故事 ↔ 後端 API 需求

| 前端故事 | 後端需要實現 | Endpoint | 優先級 |
|---------|-----------|----------|--------|
| 1.1 登入頁面 | 用戶註冊 + 登入 | POST `/api/auth/register`, `/api/auth/login` | **P1** |
| 1.2 登入頁面 | (同上) | (同上) | **P1** |
| 5.1-5.3 每日列表 | 查詢任務、打卡、日期導航 | GET `/api/tasks`, PATCH `/api/tasks/{id}` | **P1** |
| 3.1 習慣庫 | 習慣庫列表 + 搜尋 | GET `/api/habits?category=...` | **P2** |
| 3.2 計劃卡片 | 計劃列表 + 詳情 | GET `/api/templates/public` | **P2** |
| 4.1 加入習慣 | 建立任務 | POST `/api/tasks` | **P2** |
| 4.2 加入計劃 | **Pre-bake 生成任務** | POST `/api/user/assignments` | **P2** |
| 6.1 統計頁面 | 統計聚合（完成率、streak、heatmap） | GET `/api/stats` | **P3** |
| 7.1-7.2 編輯/刪除 | 編輯 + 刪除任務 | PATCH/DELETE `/api/tasks/{id}` | **P3** |

---

## 核心功能檢查清單

### ✅ Pre-bake（最複雜）

你需要確認 POST `/api/user/assignments` 能夠：

```javascript
✅ 建立 Assignment row
✅ 讀取 template.tasks（支持 v1.0 flat array + v2.0 phases 結構）
✅ 遍歷每個 phase，計算日期：
   - phase_1（days=2）→ startDate + [0, 1]
   - phase_2（days=3）→ startDate + [2, 3, 4]
   - ...
✅ 為每個 (task, date) 組合建立 Task row
✅ 設定 Task.date = 該任務的日期
✅ 冪等性：重複加入同計劃應防止重複生成
✅ 性能：避免 N+1，批量插入
```

**驗證方法**：
```bash
# 1. 建立 assignment
curl -X POST http://localhost:3000/api/user/assignments \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_123", "templateId": "template_daisy", "startDate": "2026-06-12"}'

# 2. 查詢生成的任務
curl "http://localhost:3000/api/tasks?userId=user_123"

# 3. 驗證日期計算正確
# 應該看到 14 天的任務，日期分佈符合 phase days 配置
```

---

### ✅ 任務打卡（3 種類型）

確認 PATCH `/api/tasks/{id}` 能夠處理：

```javascript
✅ Binary（二元）：
   completed = true/false

✅ Quantitative（數值）：
   value = 250（取決於 dailyTarget 和 stepValue）
   completed = (value >= dailyTarget)

✅ Checklist（檢查清單）：
   subtaskCompletions = { subtask_id: true/false }
   completed = (所有 visible subtasks 都 = true)
   value = 已勾選的子項數
```

**Database 查詢**：
```sql
-- 查詢某用戶今天的完成狀態
SELECT id, title, type, 
  (history->>'2026-06-12')::json->>'completed' as today_completed
FROM "Task"
WHERE "userId" = 'user_123' AND status = 'active';
```

---

### ✅ 統計聚合

確認 GET `/api/stats?userId=...` 回傳：

```javascript
{
  completionRate: 0.75,      // 完成率
  streak: 5,                 // 連續完成天數
  domainBreakdown: {         // 9 域分佈
    "fitness": { completed: 5, total: 6 },
    "mindfulness": { completed: 3, total: 4 },
    ...
  },
  weeklyHeatmap: [           // 28 天熱力圖
    { date: "2026-06-12", completion: 1.0 },
    { date: "2026-06-11", completion: 0.8 },
    ...
  ],
  taskRanking: [             // 完成次數排行
    { taskId: "task_1", title: "跑步", completed: 7 },
    ...
  ]
}
```

**計算邏輯**：
- 完成率 = 過去 N 天完成任務數 / 總機會數
- Streak = 從今天往前數，連續有完成紀錄的天數
- Domain 分佈 = 按 Task.category 分組，計算每域的完成率
- Heatmap = 每日完成比例

---

## 常見問題 & 陷阱

### Q1: TaskHistory 是獨立表，查詢會不會慢？

**A**：不會。有 @@index([taskId, date])。查詢模式：
```sql
SELECT * FROM "TaskHistory" 
WHERE "taskId" = 'task_123' AND date BETWEEN '2026-06-01' AND '2026-06-30'
```

### Q2: Pre-bake 重複執行會不會重複生成任務？

**A**：不會。有 @@unique([userId, templateId]) 在 Assignment。重複加入會拋 unique constraint error。

### Q3: 我該先做 Admin 系統嗎？

**A**：不用。官方習慣 + 計劃模板可以手動插入或用 seed script。Admin CRUD 可推遲。

### Q4: 女性週期 (menstrual) 需要嗎？

**A**：Assignment.isMenstrual 已儲存，但視覺化邏輯缺。如時間緊張可推遲。

### Q5: 位置日記 (Slice O) 需要嗎？

**A**：TaskHistory.lat/lng/city 已存儲，但前端無地圖 UI。可推遲實現。

### Q6: 工具建議 (tool) 和背景音樂需要嗎？

**A**：
- **Tool 建議**：Task.tool 欄位已存儲（見 constants.js），API 已回傳。前端只需在 task card 中顯示建議文字（如「手機計步器」）
- **背景音樂**：OfficialHabit.defaultMusicUrl + Task.musicUrl 欄位已存儲。前端需實現 HTML5 `<audio>` 播放器。可以 MVP 後再做，或作為 MVP 亮點功能。

**實現順序**：
1. ✅ Task.tool 在 daily view 顯示（簡單）
2. 🟡 Task.musicUrl 播放器（需要前端播放 UI）

---

## 部署注意事項

### Dev = Prod ⚠️

同一個 Vercel Postgres 實例，任何 script 都會影響生產。

**安全實踐**：
```bash
# 推送 schema（自動觸發 Vercel build）
git push origin main
# Vercel 會在 build 時執行 prisma db push

# 若需手動腳本，確保冪等
# 例：upsert by unique key，不要 INSERT 或 DELETE
```

### 監控

```bash
# Vercel 儀表板
https://vercel.com/projects

# Sentry 錯誤追蹤（若已設定）
https://sentry.io/

# Vercel Postgres 日誌
vercel logs --function api/tasks
```

---

## 測試檢查清單

在宣佈「完成」前，確認：

```
[ ] 認證
    [ ] 新註冊 ✓
    [ ] 登入（密碼正確/錯誤） ✓
    [ ] 密碼加密驗證（bcrypt） ✓

[ ] 任務 CRUD
    [ ] 新增任務（3 種類型） ✓
    [ ] 查詢任務（按 userId、status、date） ✓
    [ ] 編輯任務（部分更新，不覆蓋 history） ✓
    [ ] 刪除任務 ✓

[ ] 打卡
    [ ] Binary 任務 ✓
    [ ] Quantitative 任務（cumulative value） ✓
    [ ] Checklist 任務（子項勾選） ✓

[ ] Pre-bake
    [ ] 加入計劃，自動生成 14 天任務 ✓
    [ ] 日期計算正確（跨月） ✓
    [ ] 冪等性（重複加入防護） ✓

[ ] 統計
    [ ] 完成率計算 ✓
    [ ] Streak 計算 ✓
    [ ] Domain 分佈 ✓
    [ ] Heatmap 生成 ✓

[ ] 安全
    [ ] 所有權驗證（userId check） ✓
    [ ] SQL injection 防護（用 Prisma） ✓
    [ ] 密碼不在 API 回應 ✓
```

---

## 參考資料

- **完整架構**：`BACKEND_FULL_PICTURE.md`
- **前端需求**：`MVP.md`（14 個故事 + AC）
- **4 週計劃**：`MVP_4WEEK_PLAN.md`
- **Prisma 文檔**：https://www.prisma.io/docs
- **Vercel Postgres**：https://vercel.com/docs/storage/vercel-postgres

---

**祝開發順利！遇到問題歡迎發問。** 🚀

最後更新：2026-06-12
