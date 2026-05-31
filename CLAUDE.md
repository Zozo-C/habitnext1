# HabitNext 專案開發規範

## UI 開發規範

來源：`~/ai-skills/ui-demo/SKILL.md`（Senior UI Demo Prototyper）

### 核心技術棧
- **Framework**: React (Functional Components + Hooks)
- **Styling**: Tailwind CSS（嚴禁使用 Inline Styles）
- **Icons**: lucide-react
- **Animations**: framer-motion（進場動畫、Hover 效果、Modal 轉換）
- **Types**: TypeScript（需定義基礎 Interface）

### 數據與邏輯
- 所有文案、選單、模擬數據統一放在 `src/data/mockData.ts`
- UI 組件內只引用數據變數，不內嵌 hardcoded 文字
- 數據加載需實作 800ms 延遲模擬 + Skeleton Screen

### 視覺與風格
- 遵守 8px 網格系統
- Typography 使用 Inter 字體，注重色彩層次感
- 所有 Button/Link 必須包含 `hover:`, `active:`, `transition-all`
- Mobile-first 響應式開發

### 工程品質
- 單一檔案不超過 150 行，超過則拆分組件
- 目錄結構：`/components`, `/pages`, `/hooks`, `/data`
