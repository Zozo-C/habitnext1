# HabitNext 後台 — Full Picture

> **針對**：後端工程師、DevOps、測試  
> **目的**：建立後台系統的完整願景、數據模型、API 設計  
> **版本**：2026-06-12  
> **狀態**：MVP 範圍定義中

---

## 第一部分：後台願景

### 兩層系統架構

HabitNext 後台分為**兩個獨立系統**：

#### Layer 1：Admin 系統（專家內容建置）
- 專家登入/註冊 + 批准工作流
- 建立計劃模板（含 phase 結構）
- 建立官方習慣（含 3 難度設定）
- 新增科學佐證（Claude AI 協助）
- 管理分類、職稱等元數據

#### Layer 2：User 系統（用戶習慣追蹤）

1. **用戶認證與身份**  
   - 手機 + 密碼登入 / 註冊
   - 儲存用戶雙維分型（花朵型 + 睡眠型）
   - 支持嚮往系統（用戶設定人生目標）

2. **習慣探索與加入**  
   - 瀏覽 105 個官方習慣（9 GENESIS+IO 域 × 4 難度）
   - 瀏覽 20 個計劃模板（4 花朵 + 4 睡眠 + 其他）
   - 加入計劃時自動生成任務（pre-bake）

3. **每日追蹤**  
   - 儲存每日完成狀態（打卡記錄）
   - 支持 3 種任務類型：二元、數值、檢查清單
   - 支持位置日記、美食照片、備忘錄
   - 保留完整歷史（用於統計和回顧）

4. **統計與洞察**  
   - 完成率、Streak、9 域分佈、週熱力圖
   - 旅程地點聚合（位置日記）
   - 支持日期回溯（查看歷史紀錄）

---

## 第二部分：系統架構

### 技術堆棧

| 層 | 技術 | 說明 |
|---|---|---|
| **框架** | Next.js 14 App Router | 同構 JS，API routes = `/app/api/**` |
| **數據庫** | Vercel Postgres + Prisma 5 | 關聯式數據庫，Schema 版本化 |
| **認證** | Phone + bcrypt（無 JWT） | User info 儲存在前端 localStorage |
| **部署** | Vercel auto-deploy | 推到 main → 自動 build + deploy |
| **環境** | Dev = Prod | 同一個 Vercel Postgres，需謹慎 |

### 核心數據模型

#### User（用戶）

```prisma
model User {
  id            String   @id @default(cuid())
  phone         String   @unique
  password      String?  // bcrypt 雜湊值
  nickname      String?  // 用戶昵稱
  avatarSeed    String?  // 頭像種子
  typeKey       String?  // 'daisy' | 'rose' | 'orchid' | 'sunflower'
  sleepTypeKey  String?  // 'stress' | 'rhythm' | 'metabolic' | 'hormone'
  
  tasks         Task[]
  assignments   Assignment[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**用途**：
- `typeKey` + `sleepTypeKey` = 雙維分型，控制推薦邏輯
- `password` 用 bcrypt 加密
- `avatarSeed` 用來生成 DiceBear 頭像

---

#### OfficialHabit（官方習慣庫）

```prisma
model OfficialHabit {
  id            String   @id @default(cuid())
  slug          String   @unique  // 'morning_run', 'meditation', ...
  name          String             // 「早晨跑步」
  description   String?
  category      String             // 'fitness', 'mindfulness', ... (9 個 slug)
  
  difficulties  Json    // { 
                        //   "beginner": { 
                        //     type, dailyTarget, unit, subtasks,
                        //     tool, recommend, musicUrl
                        //   },
                        //   "intermediate": { ... },
                        //   "challenge": { ... }
                        // }
  
  defaultTool   String?  // 預設工具建議（如「番茄鐘」）
  defaultMusicUrl String? // 預設音樂 URL（如 4-7-8 呼吸法）
  
  insights      HabitInsight[]
  createdAt     DateTime @default(now())
}
```

**用途**：
- 存儲 105 個官方習慣定義
- 每個習慣支持 3 個難度（入門/進階/挑戰）
- 難度 config 包含：目標值、計量單位、子任務、**工具建議、音樂 URL**
- `defaultTool` / `defaultMusicUrl` 供 pre-bake 時複製到 Task

**數據**：105 筆（seed via `scripts/seed-genesis-io-habits.js`）

**Tool 範例**：
```json
{
  "beginner": {
    "type": "quantitative",
    "dailyTarget": 1000,
    "unit": "meter",
    "tool": "手機計步器",
    "recommend": "飯後散步 20 分鐘",
    "musicUrl": null
  },
  "challenge": {
    "type": "quantitative",
    "dailyTarget": 5000,
    "unit": "meter",
    "tool": "計時器 + 計步器",
    "recommend": "快走 45 分鐘",
    "musicUrl": "https://cdn.example.com/upbeat-music.mp3"
  }
}
```

---

#### Template（計劃模板）

```prisma
model Template {
  id            String   @id @default(cuid())
  slug          String   @unique  // 'daisy_week1', 'sleep_7day', ...
  name          String             // 「雛菊 7 天」
  description   String?
  category      String             // joins to PlanCategory.slug
  
  tasks         Json    // v2.0: {
                        //   version: "2.0",
                        //   phases: [
                        //     { id, name, days, tasks: [...] }
                        //   ]
                        // }
  
  isPublished   Boolean  @default(true)
  createdAt     DateTime @default(now())
}
```

**用途**：
- 儲存 20 個計劃模板
- 支持多 phase 結構（每 phase 有名稱、持續天數、任務清單）
- 總日數 = ∑ phase.days

**數據**：20 筆（包括 4 花朵型 + 4 睡眠型 + 其他）

---

#### PlanCategory（分類）

```prisma
model PlanCategory {
  id            String   @id @default(cuid())
  slug          String   @unique
  name          String
  color         String?   // Hex color
  icon          String?   // Emoji or icon key
  order         Int       @default(0)
  isSystem      Boolean   @default(false)  // 保護 slug
}
```

**用途**：
- 統一的分類維度（13 筆）
- 8 個 system（4 花朵 + 4 睡眠），5 個 user-defined
- System categories 的 slug 不可改（強型別保護）

---

#### Task（用戶任務）

```prisma
model Task {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  assignmentId    String?     // FK to Assignment（來自計劃），NULL = 手動新增
  assignment      Assignment? @relation(fields: [assignmentId], references: [id])
  
  officialHabitId String?     // FK to OfficialHabit（官方習慣參考）
  
  title           String
  cue             String?     // 「午餐後」— 行為錨點
  identity        String?     // 「我是個活躍的人」— 身分宣告
  category        String      // 'fitness', ... (9 個 GENESIS+IO slug)
  type            String      // 'binary' | 'quantitative' | 'checklist'
  status          String      @default('active')  // 'active' | 'paused' | 'archived'
  
  // 數值任務欄位
  dailyTarget     Int?
  unit            String?     // 'ml', 'min', 'rep', ...
  stepValue       Int?        // +1 或 +250
  
  // 檢查清單欄位
  subtasks        Json?       // [{ id, name, addedAt, removedAt? }]
  
  // Pre-baked 計劃任務
  date            String?     // 'yyyy-mm-dd' — 該任務應完成的日期
  metadata        Json?       // { phaseName, phaseOrder, phaseStartDate, ... }
  
  // Focus map (Slice D/L)
  userImpact      Int?        // 1-5，用戶評分此習慣對人生的影響
  userAbility     Int?        // 1-5，用戶評分自己的執行力
  
  // 鎖定狀態
  isLocked        Boolean     @default(false)
  
  // 輔助工具建議
  tool            String?     // 「手機計步器」「番茄鐘」「4-7-8 呼吸法音樂」
  recommend       String?     // 「飯後散步 20 分鐘」
  musicUrl        String?     // 若 tool 涉及音樂，指向播放 URL
  
  // 其他欄位（未來使用）
  frequency       String?
  recurrence      Json?
  reminder        Json?
  
  histories       TaskHistory[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  @@index([userId, status])
  @@index([assignmentId])
}
```

**用途**：
- 儲存用戶的所有任務（手動新增 + 計劃生成）
- `date` 用於 pre-baked 計劃任務（daily view 按此日期過濾）
- `type` 控制打卡邏輯（二元圈 vs 數值輸入 vs 檢查清單）
- `subtasks` 儲存檢查清單的子項
- `userImpact/userAbility` 支持 Slice D/L Focus Map（用戶評分）
- **`tool` 提供輔助工具建議**（例：計步器、番茄鐘、呼吸法音樂）
- **`musicUrl` 指向音樂資源**（若任務涉及音樂播放）

---

#### TaskHistory（任務每日紀錄）

```prisma
model TaskHistory {
  id                    String   @id @default(cuid())
  taskId                String
  task                  Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  
  date                  String   // 'yyyy-mm-dd' — 該紀錄的日期
  completed             Boolean  @default(false)
  value                 Int      @default(0)  // 數值任務的值或子任務完成數
  subtaskCompletions    Json?    // { [subtaskId]: true/false }
  
  // Slice O — 位置日記
  lat                   Float?
  lng                   Float?
  city                  String?
  
  // Slice Q — 美食照片
  photoUrl              String?
  memoNote              String?
  
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  @@unique([taskId, date])
  @@index([taskId, date])
}
```

**用途**：
- 逐日紀錄每個任務的完成狀態
- `completed` = true 表示該日任務已完成（對應二元任務或檢查清單全勾）
- `value` = 數值任務的當日進度
- `subtaskCompletions` = 檢查清單的子項勾選狀態
- `lat/lng/city` = 位置日記（可選 Slice O）
- `photoUrl/memoNote` = 美食照片（可選 Slice Q）

**設計理由**：
- 用獨立表而不是 JSON，因為每日有多個欄位（completed、value、subtaskCompletions、位置、照片）
- @@unique(taskId, date) 確保同一任務同一天只有一筆紀錄
- 支持高效的日期範圍查詢（heatmap、streak 計算）

---

#### Assignment（計劃加入記錄）

```prisma
model Assignment {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  templateId    String
  template      Template @relation(fields: [templateId], references: [id])
  
  expertId      String?  // FK to Expert（計劃專家）
  
  startDate     String   // 'yyyy-mm-dd' — 用戶選擇的開始日期
  status        String   @default('active')  // 'active' | 'completed' | 'paused'
  
  // Slice E — 女性週期（花朵型特有）
  isMenstrual   Boolean  @default(false)
  menstrualStart String?  // 月經開始日期
  
  tasks         Task[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  @@unique([userId, templateId])
  @@index([userId, status])
}
```

**用途**：
- 紀錄用戶加入哪些計劃
- `startDate` = 用戶選擇的開始日期（觸發 pre-bake）
- `isMenstrual` = 支持月經週期調整（Slice E）
- 加入時觸發 pre-bake 邏輯（為全部 phase 日期生成 Task rows）

---

#### Expert（專家帳號 - Admin 系統）

```prisma
model Expert {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String   // bcrypt 雜湊
  name          String
  title         String?
  
  titleId       String?  // FK to ExpertTitle
  expertTitle   ExpertTitle? @relation(fields: [titleId], references: [id])
  
  role          String   @default('expert')  // 'expert' | 'admin'
  isApproved    Boolean  @default(false)
  isActive      Boolean  @default(true)
  
  templates     Template[]
  assignments   Assignment[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model ExpertTitle {
  id      String   @id @default(cuid())
  name    String   @unique
  experts Expert[]
  isActive Boolean @default(true)
}
```

**用途**：
- 儲存專家帳號（瑜珈教練、營養師、睡眠專家等）
- `isApproved` = 管理員批准工作流
- 專家可建立計劃模板、習慣、科學佐證

---

#### Aspiration（嚮往 - Slice K）

```prisma
model Aspiration {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  text      String   // 「我想成為更活躍的人」
  domain    String   // GENESIS+IO domain（如 'fitness', 'mindfulness'）
  status    String   @default('active')  // 'active' | 'achieved' | 'archived'
  source    String   @default('user')    // 'user' | 'preset'
  
  habits    AspirationHabit[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId, status])
}

model AspirationHabit {
  id          String @id @default(cuid())
  aspirationId String
  aspiration  Aspiration @relation(fields: [aspirationId], references: [id], onDelete: Cascade)
  
  taskId      String?  // FK to Task（可為 null，表示推薦但未建立）
  
  @@unique([aspirationId, taskId])
}
```

**用途**：
- 用戶設定人生目標（嚮往系統）
- 關聯習慣來實現目標
- 推薦系統基於 domain 推薦適合的計劃

---

#### HabitInsight（科學佐證 - Slice N）

```prisma
model HabitInsight {
  id            String   @id @default(cuid())
  habitId       String
  habit         OfficialHabit @relation(fields: [habitId], references: [id], onDelete: Cascade)
  
  title         String
  summary       String?
  detail        String?
  takeaway      String?
  
  tags          Json?    // ['科學', '營養', '睡眠']
  sources       Json?    // [{ title, url, author }]
  evidence      Json?    // { correctness, relevance, recency, credibility } — 1-5 評分
  
  status        String   @default('draft')  // 'draft' | 'published' | 'archived'
  aiGenerated   Boolean  @default(false)
  sourcePrompt  String?  // Claude 生成時的 prompt
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

**用途**：
- 儲存每個習慣背後的科學佐證
- 支持 Claude AI 草擬（/api/admin/habits/insights/draft）
- 管理員可編輯、批准、發佈

---

#### PlanCategory & HabitCategory

```prisma
model PlanCategory {
  id       String   @id @default(cuid())
  slug     String   @unique    // 'daisy', 'sleep_stress', ...
  name     String
  color    String?
  icon     String?
  domain   String?  // GENESIS+IO 域（用於推薦篩選）
  
  isSystem Boolean  @default(false)  // true = 系統類別（不可刪除）
  order    Int      @default(0)
  
  templates Template[]
  isActive Boolean @default(true)
}

model HabitCategory {
  id       String   @id @default(cuid())
  name     String   @unique
  color    String?
  icon     String?
  order    Int      @default(0)
}
```

**用途**：
- 統一的分類維度
- PlanCategory 支持 isSystem flag（保護系統類別）
- HabitCategory 用於習慣分類

---

### 關鍵流程

#### 流程 1：用戶註冊與登入

```
[前端] 手機 + 密碼
  ↓
[後端] POST /api/auth/register
  • 驗證手機格式
  • 檢查手機唯一性
  • bcrypt 加密密碼
  • 建立 User row
  • 回傳 user info（不包含 password）
  
[前端] 儲存 userId 到 localStorage
  ↓
[前端] 後續請求都帶 ?userId=...
```

**相關 Endpoints**：
- `POST /api/auth/register` — 新註冊
- `POST /api/auth/login` — 登入
- `POST /api/auth/demo` — Demo 帳戶

---

#### 流程 2：新增手動習慣

```
[前端] 用戶選擇難度 → 錨點 → 身分 → 提交
  ↓
[後端] POST /api/tasks
  • userId 必須
  • 驗證 category（9 個之一）
  • 驗證 type（binary / quantitative / checklist）
  • 建立 Task row（status = 'active'，history = {}）
  • 回傳 task info
  
[前端] 新任務立即出現在 DailyView
```

**相關 Endpoints**：
- `POST /api/tasks` — 建立任務
- `GET /api/tasks?userId=...` — 列出用戶任務
- `PATCH /api/tasks/{id}` — 編輯任務
- `DELETE /api/tasks/{id}` — 刪除任務

---

#### 流程 3：加入計劃（Pre-bake）

```
[前端] 瀏覽計劃 → 點擊「加入」→ 選擇開始日期 → 確認
  ↓
[後端] POST /api/user/assignments
  • 驗證 templateId
  • 驗證用戶未重複加入
  • 建立 Assignment row（status = 'active'）
  • 觸發 pre-bake 邏輯：
    - 讀取 template.tasks（v2.0 phases 結構）
    - 遍歷每個 phase + task
    - 計算 task 的日期（startDate + phase offset）
    - 為每個日期建立 Task row（status = 'active'，history = {}）
  • 回傳 assignment + 生成的 task 列表
  
[前端] 明日及之後的日期出現新任務
```

**相關 Endpoints**：
- `POST /api/user/assignments` — 加入計劃
- `GET /api/templates/public` — 列出公開計劃

---

#### 流程 4：每日打卡

```
[前端] 用戶點擊「完成」或修改數值
  ↓
[後端] PATCH /api/tasks/{id}
  • 讀取 history（目前的日期地圖）
  • 更新 today 的條目：
    - binary：completed = true
    - quantitative：value = new value
    - checklist：subtaskCompletions = { subtaskId: true }
  • 回傳更新後的 task
  
[前端] 卡片動畫 + 進度條更新 + Undo toast
```

**相關 Endpoints**：
- `PATCH /api/tasks/{id}` — 更新任務（打卡）

---

#### 流程 5：統計與查詢

```
[前端] 用戶進入統計頁面
  ↓
[後端] GET /api/stats?userId=...
  • 聚合全部 active tasks 的 history
  • 計算：
    - 完成率（今日）
    - Streak（連續完成天數）
    - 9 域分佈（task 按 category 分組）
    - 週熱力圖（7 天 × 4 週）
    - Task ranking（完成次數最多的前 N 個）
  • 回傳統計對象
  
[前端] 5 個 widget 渲染
```

**相關 Endpoints**：
- `GET /api/stats?userId=...` — 取得統計數據

---

## 第三部分：API 設計規範

### 請求格式

全部 API 使用 JSON：

```javascript
// 請求
POST /api/auth/register
Content-Type: application/json

{
  "phone": "+886987654321",
  "password": "SecurePass123"
}

// 響應
200 OK
{
  "id": "user_abc123",
  "phone": "+886987654321",
  "nickname": null,
  "typeKey": null,
  "sleepTypeKey": null,
  "createdAt": "2026-06-12T10:00:00Z"
}
```

### 錯誤處理

全部錯誤使用標準 HTTP 狀態碼：

| 狀態碼 | 情況 | 範例 |
|---|---|---|
| 400 | 請求驗證失敗 | 手機格式錯誤、缺少必需欄位 |
| 401 | 認證失敗 | 密碼錯誤、未登入 |
| 403 | 授權失敗 | 用戶試圖編輯他人的任務 |
| 404 | 資源不存在 | Task ID 不存在 |
| 409 | 資源衝突 | 手機號碼已被註冊 |
| 500 | 伺服器錯誤 | 資料庫連線失敗 |

### 通用安全規則

1. **無狀態認證**  
   - 不使用 session 或 JWT
   - 前端傳遞 `userId` 參數
   - 後端驗證 `userId` 存在且有效

2. **數據隔離**  
   - 所有讀寫都加上 `userId` 過濾
   - 用戶 A 無法讀取/修改用戶 B 的任務

3. **密碼加密**  
   - 儲存 bcrypt 雜湊值（salt rounds = 10）
   - 登入時用 `bcrypt.compare()` 驗證
   - API 回應永遠不包含 `password` 欄位

4. **Schema 保護**  
   - 系統 category / slug 不可透過 API 修改
   - UI 和 API 都鎖住 PlanCategory.isSystem 的修改

---

## 第四部分：數據一致性原則

### Pre-bake 冪等性

當用戶加入計劃時，系統生成 N 天的 Task rows。此操作必須是**冪等的**（重複執行不會產生重複）：

```javascript
// 檢查用戶是否已加入此計劃
const existing = await prisma.assignment.findUnique({
  where: {
    userId_templateId: { userId, templateId }
  }
});

if (existing) {
  return NextResponse.json({ 
    error: 'Already assigned this template' 
  }, { status: 409 });
}

// 則可安全地建立 assignment + tasks
```

### History JSON 結構

Task 的 `history` 欄位是一個日期 → 完成狀態 map：

```javascript
{
  "2026-06-10": {
    "value": 250,           // 數值任務的值
    "completed": true,      // 是否已完成
    "subtaskCompletions": {
      "breakfast": true,
      "lunch": false,
      "dinner": false
    }
  },
  "2026-06-11": {
    "value": 500,
    "completed": true,
    "subtaskCompletions": {}
  }
}
```

**查詢邏輯**（Helper 函數）：

```javascript
function isCompletedOnDate(task, dateStr) {
  const record = task.history[dateStr];
  return record?.completed ?? false;
}

function getCompletionRate(task, days = 7) {
  const today = new Date();
  let completed = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    if (isCompletedOnDate(task, dateStr)) completed++;
  }
  return completed / days;
}
```

---

## 第五部分：開發環境與部署

### 本地開發

```bash
# 1. 拉取 .env 變數
vercel env pull .env.local

# 2. 啟動開發伺服器
npm run dev

# 3. 跑資料庫遷移
cd web-app && npx prisma db push

# 4. 種子數據（官方習慣）
npm run seed
```

### Production 注意事項

**Dev = Prod**：同一個 Vercel Postgres 實例。任何 script 都會影響生產資料。

**部署流程**：
1. 本地修改 `schema.prisma`
2. `git push` 到 main
3. Vercel build 自動執行 `prisma db push`
4. 若需 backfill，寫 idempotent script 並手動跑

**無 migration history**：
- Prisma CLI 用 schema 作 source of truth
- 所有 script 必須是 **upsert by unique key**（確保冪等）
- 要新欄位 + backfill？步驟：
  1. 加 nullable 欄位 → push
  2. 跑 backfill script
  3. 改 nullable → non-null（若需要） → push

---

## 第六部分：關鍵設計決策

### 為什麼用 userId 而不是 JWT？

**優點**：
- 簡化（無 session 管理）
- 前端完全控制（可離線）

**缺點**：
- 無法遠程 revoke token
- 用戶可偽造他人 userId（應前端端約束，後端驗證）

**此設計適合**：團隊協作 app、社群平台 ❌  
**此設計適合**：個人習慣追蹤 app ✅

### 為什麼用 `date` 欄位和 pre-bake？

**Pre-bake（提前生成）的好處**：
- Daily view 不需 runtime 計算日期
- 歷史查詢直接 `WHERE date = '2026-06-10'`
- 性能：讀取 O(1)，寫入一次

**替代方案**（Runtime 計算）：
- 加入計劃時只記 Assignment row
- Daily view 時動態計算 phase offset
- 缺點：複雜、慢、易出錯

### 為什麼 history 用 JSON map 而不是關聯表？

**JSON map 的好處**：
- 緊湊（不需另一張表）
- 易於 append（每天新增一筆）
- 支持日期跳躍（某些日期完成、某些日期空白）

**缺點**：
- 查詢不如關聯表靈活
- 聚合統計稍複雜

**此設計適合**：個人任務、習慣記錄 ✅

---

## 第七部分：未來擴展（Phase 2+）

### 支援功能（已代碼實現，未啟用）

1. **成就系統**（Achievement）
   - 定義：100 天 Streak、完成 50 個習慣
   - Schema：已有 Achievement 表
   - 未啟用原因：前端成就頁僅文字，無徽章/進度條

2. **推薦引擎**（Recommendation）
   - 基於用戶類型推薦習慣
   - Endpoint：`GET /api/aspirations/{id}/recommendations`
   - 未啟用原因：前端習慣探索未集成推薦

3. **專家指導**（Expert）
   - 習慣背後的科學
   - Schema：已有 Expert 表（MBTI 分型）
   - 未啟用原因：前端無專家卡片詳情

4. **Insight 系統**（HabitInsight）
   - AI-driven 洞察（「你在早晨更容易完成」）
   - Endpoint：`POST /api/habits/{habitId}/insights/draft`
   - 未啟用原因：前端無 insight 頁面

### Phase 2 優先事項

1. ✅ 社群與分享（用戶互動）
2. ✅ 推薦引擎整合（個性化）
3. ✅ AI Insight（洞察）
4. ✅ 成就系統啟用（動機）

---

## 第八部分：完整 API Routes 速查表（44 個）

### 認證（Authentication）

| Method | Endpoint | 用途 |
|--------|----------|------|
| POST | `/api/auth/register` | 用戶註冊（手機 + 密碼） |
| POST | `/api/auth/login` | 用戶登入 |
| POST | `/api/auth/demo` | Demo 帳戶（快速體驗） |
| POST | `/api/admin/auth/register` | 專家註冊 |
| POST | `/api/admin/auth/login` | 專家登入 |

### 任務管理（Tasks）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/tasks` | 列出用戶任務（含 `tool`, `musicUrl`） |
| POST | `/api/tasks` | 新增任務 |
| PATCH | `/api/tasks/[id]` | 編輯或打卡任務 |
| DELETE | `/api/tasks/[id]` | 刪除任務 |
| DELETE | `/api/tasks/[id]/subtasks/[subtaskId]` | 刪除子任務 |
| GET | `/api/tasks/candidates` | 取得候選任務（Slice L Focus Map） |
| PATCH | `/api/tasks/batch-rate` | 批次評分候選任務 |

### 官方習慣（Habits）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/habits` | 列出官方習慣庫（可按 category 篩選） |
| GET | `/api/habits/[habitId]/insights` | 取得習慣的科學佐證 |
| POST | `/api/admin/habits` | Admin 建立習慣 |
| GET | `/api/admin/habits` | Admin 列表習慣 |
| PUT | `/api/admin/habits/[habitId]` | Admin 更新習慣 |
| DELETE | `/api/admin/habits/[habitId]` | Admin 刪除習慣 |
| POST | `/api/admin/habits/insights/draft` | Claude AI 草擬科學佐證 |
| POST | `/api/admin/habits/[habitId]/insights` | Admin 新增科學佐證 |
| PUT | `/api/admin/habits/insights/[id]` | Admin 編輯科學佐證 |
| DELETE | `/api/admin/habits/insights/[id]` | Admin 刪除科學佐證 |

### 計劃模板（Templates）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/templates/public` | 列出公開計劃模板 |
| POST | `/api/admin/templates` | Admin 建立計劃 |
| GET | `/api/admin/templates` | Admin 列表計劃 |
| PUT | `/api/admin/templates/[id]` | Admin 編輯計劃 |
| DELETE | `/api/admin/templates/[id]` | Admin 刪除計劃 |

### 計劃訂閱 & Pre-bake（Assignments）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/user/assignments` | 列出用戶訂閱的計劃 |
| POST | `/api/user/assignments` | **加入計劃 + Pre-bake 生成任務** |
| PUT | `/api/user/assignments/[id]` | 編輯訂閱（狀態、月經日期等） |
| DELETE | `/api/user/assignments/[id]` | 取消訂閱 |
| GET | `/api/admin/assignments` | Admin 查看所有訂閱 |

### 嚮往系統（Aspirations - Slice K）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/aspirations` | 列出用戶嚮往 |
| POST | `/api/aspirations` | 建立嚮往 |
| PUT | `/api/aspirations/[id]` | 編輯嚮往 |
| DELETE | `/api/aspirations/[id]` | 刪除嚮往 |
| POST | `/api/aspirations/[id]/habits` | 連接嚮往到習慣 |
| GET | `/api/aspirations/[id]/recommendations` | 推薦合適的計劃 |

### 用戶資料（User Profile）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/user/profile` | 取得用戶資料 |
| PUT | `/api/user/profile` | 編輯用戶資料（暱稱、類型、密碼等） |
| POST | `/api/user/menstrual` | 切換月經週期狀態（Slice E） |

### 統計 & 旅程（Stats & Journey）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/stats` | 取得統計數據（完成率、streak、heatmap） |
| GET | `/api/journey` | 取得位置日記聚合（Slice O + P） |
| GET | `/api/memory/[historyId]` | 美食照片重定向（Slice Q） |

### 分類管理（Categories）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/plan-categories` | 列出計劃分類 |
| POST | `/api/admin/plan-categories` | Admin 新增計劃分類 |
| PUT | `/api/admin/plan-categories/[id]` | Admin 編輯計劃分類 |
| DELETE | `/api/admin/plan-categories/[id]` | Admin 刪除計劃分類 |
| POST | `/api/admin/categories` | Admin 新增習慣分類 |
| PUT | `/api/admin/categories/[id]` | Admin 編輯習慣分類 |
| DELETE | `/api/admin/categories/[id]` | Admin 刪除習慣分類 |

### 專家管理（Experts - Admin Only）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/admin/experts` | 列表專家 + 批准工作流 |
| PUT | `/api/admin/experts/[id]` | 編輯專家（批准狀態） |
| DELETE | `/api/admin/experts/[id]` | 刪除專家 |
| GET | `/api/admin/titles` | 列表專家職稱 |
| POST | `/api/admin/titles` | 新增職稱 |
| PUT | `/api/admin/titles/[id]` | 編輯職稱 |
| DELETE | `/api/admin/titles/[id]` | 刪除職稱 |

### 用戶管理（Admin Only）

| Method | Endpoint | 用途 |
|--------|----------|------|
| GET | `/api/admin/users` | 列表所有用戶 |

---

## 第九部分：已實現但前端未啟用的功能

| Slice | 功能 | 實現度 | 說明 |
|-------|------|--------|------|
| **A5** | 推薦習慣 | 90% | OfficialHabit 種子資料已 seed |
| **D/L** | Focus Map（難度評分） | ✅ 100% | Task.userImpact/userAbility + candidates API 已實現 |
| **E** | 女性週期追蹤 | ✅ 100% | Assignment.isMenstrual + `/api/user/menstrual` 已實現 |
| **F** | 遞迴檢查清單 | ✅ 100% | Task.subtasks + visibleSubtasks() 邏輯已實現 |
| **G** | 身分與錨點配對 | ✅ 100% | Task.identity + Task.cue 已儲存，缺 UI picker |
| **K** | 嚮往系統 | ✅ 100% | Aspiration model + 推薦 API 已實現 |
| **N** | 科學佐證（Claude AI） | ✅ 100% | HabitInsight + Claude API 已整合 |
| **O** | 位置日記 | ✅ 100% | TaskHistory.lat/lng/city 已實現 |
| **P** | 旅程地點聚合 | 90% | aggregateJourney() 邏輯存在，缺地圖 UI |
| **Q** | 美食照片 & 備忘 | ✅ 100% | TaskHistory.photoUrl/memoNote 已實現 |
| **Tool** | 工具建議 | 🟡 部分 | Task.tool + Task.recommend 已儲存（見 constants.js），缺 UI 展示 |
| **Music** | 背景音樂 | 🟡 部分 | OfficialHabit.defaultMusicUrl + Task.musicUrl 欄位已定義，缺前端播放器 |

---

## 第十部分：工程師參考

### 開發優先順序建議（由工程師自判）

**Tier 1（核心）**：認證、任務 CRUD、Pre-bake、統計  
**Tier 2（豐富體驗）**：嚮往、位置、美食、科學佐證  
**Tier 3（未來）**：推薦引擎、專家工作流、社群分享  

### 常見開發陷阱

1. **TaskHistory 是獨立表而非 JSON** — 確保日期查詢高效
2. **Pre-bake 冪等性** — 重複加入同計劃不應重複生成任務
3. **Menstrual 週期視覺化** — Assignment.isMenstrual 儲存但 daily view 需要視覺區分
4. **userId 認證安全** — 目前無 JWT 簽章，生產環境建議改進
5. **Tool 建議來源** — Task.tool 來自：
   - OfficialHabit.defaultTool（pre-bake 時複製）
   - 手動編輯時可修改
   - 前端應當在 task card 或 detail 中展示
6. **音樂 URL 儲存與播放** — 音樂檔案應存在 CDN / Vercel Blob，Task.musicUrl 只儲存引用 URL

### 測試重點

- [ ] Pre-bake 日期計算（跨月、leap year）
- [ ] 檢查清單子項的可見性窗口（addedAt/removedAt）
- [ ] Streak 計算（連續日期定義）
- [ ] 完成率聚合（9 域分佈）

---

**最後更新**：2026-06-12  
**負責人**：後端工程師  
**狀態**：完整 Full Picture 已定義
