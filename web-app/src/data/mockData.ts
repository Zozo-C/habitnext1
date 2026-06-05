// Explore Plan Sections (mock — replace with DB data when ready)
export const explorePlanSections = [
  {
    id: 'flower',
    category: '花朵型小課程',
    emoji: '🌸',
    subtitle: '女性依體質分型，14 天分階段任務，跟著週期長出自己的花。',
    quizCard: { themeColor: '#FF6B6B', tag: '花朵型', title: '還不知道自己是哪種型嗎？', description: '填寫問卷，找到最適合你的花朵型計畫。', imageUrl: '/images/course-flower.svg' },
    templates: [
      { id: 'sunflower', name: '向日葵型小課程', tag: '花朵型', color: '#F5F0E8', accent: '#E7B707', emoji: '🌻', imageUrl: '/flowers/sunflower.svg', by: 'HabitNext 系統', description: '你像向日葵一樣會隨著能量消長與代謝節律而轉動，血糖波動大、容易餓、飯後想睡是常見困擾。', count: 3 },
      { id: 'orchid',    name: '蘭花型小課程',   tag: '花朵型', color: '#F3F0ED', accent: '#C748AF', emoji: '🌸', imageUrl: '/flowers/orchid.svg', by: 'HabitNext 系統', description: '你像蘭花一樣對環境變化比較敏感，需要穩定以及規律來支撐，當作息混亂壓力來襲時容易失衡。', count: 2 },
      { id: 'rose',      name: '玫瑰型小課程',   tag: '花朵型', color: '#F3F0ED', accent: '#FF7A80', emoji: '🌹', imageUrl: '/flowers/rose.svg', by: 'HabitNext 系統', description: '你像玫瑰一樣有盛開與含苞的節奏，身體對週期變化比較敏銳，尤其是情緒與體力的起伏。', count: 5 },
      { id: 'daisy',     name: '雛菊型小課程',   tag: '花朵型', color: '#EEF2EA', accent: '#A4C787', emoji: '🌼', imageUrl: '/flowers/daisy.svg', by: 'HabitNext 系統', description: '你像雛菊一樣穩定、日常、自然且平衡。大多數時候沒有特別明顯的不適，但這不代表不需要照顧自己。', count: 7 },
    ],
  },
  {
    id: 'sleep',
    category: '睡眠處方',
    emoji: '🌙',
    subtitle: '依睡眠困擾分型，以科學方法重建睡眠節律。',
    quizCard: { themeColor: '#169E6B', tag: '睡眠處方', title: '還不知道自己是哪種型嗎？', description: '填寫問卷，找到最適合你的睡眠處方。', imageUrl: '/images/course-sleep.svg' },
    templates: [
      { id: 'stress-sleep',    name: '壓力型睡眠處方',     tag: '睡眠', color: '#F0EDF5', accent: '#1E3A8A', emoji: '😵‍💫', by: 'HabitNext 系統', description: '大腦過度活躍、交感神經亢奮，明明很累卻睡不著，睡前思緒停不下來。', count: 4 },
      { id: 'rhythm-sleep',    name: '節律型睡眠處方',     tag: '睡眠', color: '#EDF2F6', accent: '#3B5BA0', emoji: '🌙', by: 'HabitNext 系統', description: '生理時鐘延遲或混亂，不是睡不著，而是睡錯時間；晚睡晚起、週末補眠惡化節律。', count: 6 },
      { id: 'metabolic-sleep', name: '代謝失衡型睡眠處方',  tag: '睡眠', color: '#F5F0E8', accent: '#5B3FB0', emoji: '⏰', by: 'HabitNext 系統', description: '夜間血糖波動、低血糖反應導致半夜醒來、睡眠不穩、醒來依然疲憊。', count: 3 },
      { id: 'hormone-sleep',   name: '荷爾蒙波動型睡眠處方', tag: '睡眠', color: '#F3F0ED', accent: '#6D28D9', emoji: '🔄', by: 'HabitNext 系統', description: '荷爾蒙波動影響體溫調節、情緒與睡眠深度，常見於經前、更年期、產後。', count: 2 },
    ],
  },
];

// Course Card Mock Data
export const courseCardData = [
  {
    id: 'course-1',
    themeColor: '#169E6B',
    tag: '小課程',
    title: '睡眠優化',
    description: '改善睡眠質量，開啟活力新生活',
    buttonText: '開始課程',
    imageUrl: '/images/course-sleep.png',
  },
  {
    id: 'course-2',
    themeColor: '#FF6B6B',
    tag: '花朵型',
    title: '女性保健',
    description: '了解身體，守護健康每一天',
    buttonText: '立即了解',
    imageUrl: '/images/course-flower.png',
  },
  {
    id: 'course-3',
    themeColor: '#FFD54F',
    tag: '推薦課程',
    title: '習慣養成',
    description: '21天建立改變人生的好習慣',
    buttonText: '馬上開始',
    imageUrl: '/images/course-habit.png',
  },
];

// Achievements / Badges Data
export const achievementsData = [
  {
    id: 'first-step',
    title: '第一步',
    description: '完成第一個任務',
    emoji: '🎯',
    color: '#4CAF50',
    unlocked: true,
    unlockedDate: '2026-05-01',
    progress: 1,
    requirement: 1,
  },
  {
    id: 'week-warrior',
    title: '週末戰士',
    description: '連續7天完成任務',
    emoji: '💪',
    color: '#FF6B6B',
    unlocked: true,
    unlockedDate: '2026-05-15',
    progress: 7,
    requirement: 7,
  },
  {
    id: 'consistency-king',
    title: '堅持之王',
    description: '連續30天完成任務',
    emoji: '👑',
    color: '#FFD54F',
    unlocked: false,
    progress: 12,
    requirement: 30,
  },
  {
    id: 'early-bird',
    title: '早起鳥',
    description: '完成10個早晨任務',
    emoji: '🌅',
    color: '#FFA500',
    unlocked: false,
    progress: 6,
    requirement: 10,
  },
  {
    id: 'night-owl',
    title: '夜貓子',
    description: '完成10個夜間任務',
    emoji: '🦉',
    color: '#6B5B95',
    unlocked: false,
    progress: 4,
    requirement: 10,
  },
  {
    id: 'multitasker',
    title: '多面手',
    description: '同時進行5個不同類型的任務',
    emoji: '🎪',
    color: '#3498DB',
    unlocked: true,
    unlockedDate: '2026-05-20',
    progress: 5,
    requirement: 5,
  },
];

// Achievement Center Labels
export const achievementLabels = {
  unlocked: '已解鎖',
  locked: '尚未解鎖',
  unlockedDate: '解鎖於',
  progress: '進度',
  requirement: '需要完成',
};

// Mock Tasks Data
export const mockTasks = [
  // Task 1: 早起（Binary - 一般任務）
  {
    id: 'task-1',
    userId: 'demo-user',
    title: '早起',
    details: '每天6點半前起床',
    cue: '🌅',
    identity: '早起的人',
    type: 'binary',
    category: 'droplet',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '06:00' },
    createdAt: '2026-05-01T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': true,
      '2026-05-29': true,
      '2026-05-30': true,
      '2026-05-31': false,
      '2026-06-01': true,
      '2026-06-02': true,
      '2026-06-03': false,
    },
  },

  // Task 2: 喝水（Quantitative - 記次數）
  {
    id: 'task-2',
    userId: 'demo-user',
    title: '喝水',
    details: '每天喝8杯水（2000ml）',
    cue: '💧',
    identity: '健康飲水的人',
    type: 'quantitative',
    category: 'yoga',
    frequency: 'daily',
    status: 'active',
    dailyTarget: 8,
    unit: '杯',
    stepValue: 1,
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '09:00' },
    createdAt: '2026-05-05T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    dailyProgress: {
      '2026-05-28': { value: 6 },
      '2026-05-29': { value: 8 },
      '2026-05-30': { value: 7 },
      '2026-05-31': { value: 5 },
      '2026-06-01': { value: 8 },
      '2026-06-02': { value: 6 },
      '2026-06-03': { value: 0 },
    },
  },

  // Task 3: 冥想（Checklist - 檢查清單）
  {
    id: 'task-3',
    userId: 'demo-user',
    title: '晨間冥想',
    details: '10分鐘靜坐冥想',
    cue: '🧘',
    identity: '冷靜自信的人',
    type: 'checklist',
    category: 'pill',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '07:00' },
    subtasks: [
      { id: 'sub-1', title: '找個安靜的地方', completed: false },
      { id: 'sub-2', title: '閉上眼睛', completed: false },
      { id: 'sub-3', title: '深呼吸10次', completed: false },
    ],
    createdAt: '2026-05-10T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': { subtaskCompletions: { 'sub-1': true, 'sub-2': true, 'sub-3': true } },
      '2026-05-29': { subtaskCompletions: { 'sub-1': true, 'sub-2': true, 'sub-3': false } },
      '2026-05-30': { subtaskCompletions: { 'sub-1': true, 'sub-2': true, 'sub-3': true } },
      '2026-05-31': true,
      '2026-06-01': { subtaskCompletions: { 'sub-1': true, 'sub-2': true, 'sub-3': true } },
      '2026-06-02': true,
      '2026-06-03': false,
    },
  },

  // Task 4: 運動（Quantitative with Period Goal - 週期目標）
  {
    id: 'task-4',
    userId: 'demo-user',
    title: '週運動次數',
    details: '每週運動至少3次',
    cue: '🏃',
    identity: '活力健康的人',
    type: 'quantitative',
    category: 'dumbbell',
    frequency: 'weekly',
    status: 'active',
    dailyTarget: 3,
    unit: '次',
    stepValue: 1,
    recurrence: {
      type: 'weekly',
      interval: 1,
      weekDays: [1, 2, 3, 4, 5, 6, 0],
      mode: 'period_count',
      periodTarget: 3,
      period_unit: 'week',
    },
    reminder: { enabled: true, time: '18:00' },
    createdAt: '2026-05-15T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    dailyProgress: {
      '2026-05-26': { value: 1 },
      '2026-05-27': { value: 1 },
      '2026-05-28': { value: 1 },
      '2026-05-29': { value: 0 },
      '2026-05-30': { value: 1 },
      '2026-05-31': { value: 1 },
      '2026-06-01': { value: 0 },
      '2026-06-02': { value: 1 },
      '2026-06-03': { value: 0 },
    },
  },

  // Task 5: 閱讀（Quantitative - 分鐘數）
  {
    id: 'task-5',
    userId: 'demo-user',
    title: '閱讀時間',
    details: '每天閱讀30分鐘',
    cue: '📚',
    identity: '愛學習的人',
    type: 'quantitative',
    category: 'book',
    frequency: 'daily',
    status: 'active',
    dailyTarget: 30,
    unit: '分鐘',
    stepValue: 5,
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '20:00' },
    createdAt: '2026-05-20T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    dailyProgress: {
      '2026-05-28': { value: 25 },
      '2026-05-29': { value: 35 },
      '2026-05-30': { value: 30 },
      '2026-05-31': { value: 20 },
      '2026-06-01': { value: 45 },
      '2026-06-02': { value: 28 },
      '2026-06-03': { value: 0 },
    },
  },

  // Task 6: 瑜伽（Binary）
  {
    id: 'task-6',
    userId: 'demo-user',
    title: '瑜伽練習',
    details: '每天20分鐘瑜伽',
    cue: '🧘',
    identity: '柔軟靈活的人',
    type: 'binary',
    category: 'moon',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '18:00' },
    createdAt: '2026-05-12T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': true,
      '2026-05-29': false,
      '2026-05-30': true,
      '2026-05-31': true,
      '2026-06-01': false,
      '2026-06-02': true,
      '2026-06-03': true,
    },
  },

  // Task 7: 冥想時間（Quantitative - 分鐘）
  {
    id: 'task-7',
    userId: 'demo-user',
    title: '冥想時間',
    details: '每天冥想20分鐘',
    cue: '🧘‍♀️',
    identity: '內心平靜的人',
    type: 'quantitative',
    category: 'sun',
    frequency: 'daily',
    status: 'active',
    dailyTarget: 20,
    unit: '分鐘',
    stepValue: 5,
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '07:00' },
    createdAt: '2026-05-08T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    dailyProgress: {
      '2026-05-28': { value: 20 },
      '2026-05-29': { value: 15 },
      '2026-05-30': { value: 20 },
      '2026-05-31': { value: 10 },
      '2026-06-01': { value: 20 },
      '2026-06-02': { value: 18 },
      '2026-06-03': { value: 0 },
    },
  },

  // Task 8: 跑步（Quantitative - 公里）
  {
    id: 'task-8',
    userId: 'demo-user',
    title: '跑步訓練',
    details: '每週跑步3次',
    cue: '🏃‍♂️',
    identity: '跑步愛好者',
    type: 'quantitative',
    category: 'dumbbell',
    frequency: 'weekly',
    status: 'active',
    dailyTarget: 5,
    unit: '公里',
    stepValue: 1,
    recurrence: {
      type: 'weekly',
      interval: 1,
      weekDays: [1, 3, 5],
      mode: 'period_count',
      periodTarget: 3,
      period_unit: 'week',
    },
    reminder: { enabled: true, time: '06:30' },
    createdAt: '2026-05-03T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    dailyProgress: {
      '2026-05-26': { value: 5 },
      '2026-05-28': { value: 6 },
      '2026-05-30': { value: 5 },
      '2026-06-01': { value: 7 },
      '2026-06-02': { value: 0 },
      '2026-06-03': { value: 0 },
    },
  },

  // Task 9: 健康飲食（Checklist）
  {
    id: 'task-9',
    userId: 'demo-user',
    title: '健康飲食',
    details: '每天飲食檢查',
    cue: '🥗',
    identity: '健康飲食的人',
    type: 'checklist',
    category: 'apple',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '12:00' },
    subtasks: [
      { id: 'sub-9-1', title: '早餐吃蔬菜', completed: false },
      { id: 'sub-9-2', title: '午餐均衡營養', completed: false },
      { id: 'sub-9-3', title: '晚餐清淡', completed: false },
    ],
    createdAt: '2026-05-10T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': { subtaskCompletions: { 'sub-9-1': true, 'sub-9-2': true, 'sub-9-3': false } },
      '2026-05-29': { subtaskCompletions: { 'sub-9-1': true, 'sub-9-2': true, 'sub-9-3': true } },
      '2026-05-30': true,
      '2026-05-31': { subtaskCompletions: { 'sub-9-1': true, 'sub-9-2': false, 'sub-9-3': false } },
      '2026-06-01': true,
      '2026-06-02': { subtaskCompletions: { 'sub-9-1': true, 'sub-9-2': true, 'sub-9-3': true } },
      '2026-06-03': false,
    },
  },

  // Task 10: 學習筆記（Binary）
  {
    id: 'task-10',
    userId: 'demo-user',
    title: '學習筆記',
    details: '每天記錄學習內容',
    cue: '📝',
    identity: '持續學習的人',
    type: 'binary',
    category: 'journal',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5] },
    reminder: { enabled: true, time: '21:00' },
    createdAt: '2026-05-18T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': true,
      '2026-05-29': true,
      '2026-05-30': false,
      '2026-05-31': true,
      '2026-06-01': true,
      '2026-06-02': true,
      '2026-06-03': false,
    },
  },

  // Task 11: 伸展操（Binary）
  {
    id: 'task-11',
    userId: 'demo-user',
    title: '伸展操',
    details: '每天早上伸展',
    cue: '🤸',
    identity: '柔軟的人',
    type: 'binary',
    category: 'zap',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '06:30' },
    createdAt: '2026-05-20T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': true,
      '2026-05-29': true,
      '2026-05-30': true,
      '2026-05-31': false,
      '2026-06-01': true,
      '2026-06-02': false,
      '2026-06-03': true,
    },
  },

  // Task 12: 感謝日誌（Checklist）
  {
    id: 'task-12',
    userId: 'demo-user',
    title: '感謝日誌',
    details: '每天記錄3件感謝的事',
    cue: '🙏',
    identity: '感恩的人',
    type: 'checklist',
    category: 'users',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '21:30' },
    subtasks: [
      { id: 'sub-12-1', title: '記錄第1件事', completed: false },
      { id: 'sub-12-2', title: '記錄第2件事', completed: false },
      { id: 'sub-12-3', title: '記錄第3件事', completed: false },
    ],
    createdAt: '2026-05-22T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': true,
      '2026-05-29': { subtaskCompletions: { 'sub-12-1': true, 'sub-12-2': true, 'sub-12-3': false } },
      '2026-05-30': true,
      '2026-05-31': false,
      '2026-06-01': true,
      '2026-06-02': true,
      '2026-06-03': false,
    },
  },

  // Task 13: 睡眠目標（Quantitative - 小時）
  {
    id: 'task-13',
    userId: 'demo-user',
    title: '睡眠目標',
    details: '每晚睡滿8小時',
    cue: '😴',
    identity: '睡眠充足的人',
    type: 'quantitative',
    category: 'moon',
    frequency: 'daily',
    status: 'active',
    dailyTarget: 8,
    unit: '小時',
    stepValue: 1,
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '22:00' },
    createdAt: '2026-05-15T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    dailyProgress: {
      '2026-05-28': { value: 7 },
      '2026-05-29': { value: 8 },
      '2026-05-30': { value: 6 },
      '2026-05-31': { value: 8 },
      '2026-06-01': { value: 8 },
      '2026-06-02': { value: 7 },
      '2026-06-03': { value: 0 },
    },
  },

  // Task 14: 寫日記（Binary）
  {
    id: 'task-14',
    userId: 'demo-user',
    title: '寫日記',
    details: '每晚寫日記反思',
    cue: '📔',
    identity: '自我反思的人',
    type: 'binary',
    category: 'book',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '21:00' },
    createdAt: '2026-05-25T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    history: {
      '2026-05-28': true,
      '2026-05-29': false,
      '2026-05-30': true,
      '2026-05-31': true,
      '2026-06-01': false,
      '2026-06-02': true,
      '2026-06-03': false,
    },
  },

  // Task 15: 深呼吸練習（Quantitative - 次數）
  {
    id: 'task-15',
    userId: 'demo-user',
    title: '深呼吸練習',
    details: '每天做5次深呼吸',
    cue: '💨',
    identity: '放鬆舒緩的人',
    type: 'quantitative',
    category: 'pill',
    frequency: 'daily',
    status: 'active',
    dailyTarget: 5,
    unit: '次',
    stepValue: 1,
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '12:00' },
    createdAt: '2026-05-17T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    dailyProgress: {
      '2026-05-28': { value: 5 },
      '2026-05-29': { value: 3 },
      '2026-05-30': { value: 5 },
      '2026-05-31': { value: 4 },
      '2026-06-01': { value: 5 },
      '2026-06-02': { value: 5 },
      '2026-06-03': { value: 0 },
    },
  },

  // Task 16: 每餐先吃蛋白質和蔬菜（from Sunflower Plan）
  {
    id: 'task-16',
    userId: 'demo-user',
    title: '每餐先吃蛋白質和蔬菜，再吃主食',
    details: '幫助穩定血糖',
    cue: '🥗',
    identity: '健康飲食的人',
    type: 'binary',
    category: 'apple',
    frequency: 'daily',
    status: 'active',
    recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
    reminder: { enabled: true, time: '08:00' },
    createdAt: '2026-05-20T00:00:00Z',
    updatedAt: '2026-06-02T00:00:00Z',
    assignmentId: 'assignment-sunflower',
    planId: 'sunflower',
    planName: '向日葵型小課程',
    history: {
      '2026-05-28': true,
      '2026-05-29': true,
      '2026-05-30': false,
      '2026-05-31': true,
      '2026-06-01': true,
      '2026-06-02': true,
      '2026-06-03': false,
    },
  },
];

// 計劃詳情（包含階段和任務）
export const coursePlans = {
  sunflower: {
    id: 'sunflower',
    name: '向日葵型小課程',
    duration: 28, // 天數
    totalTasks: 28,
    participants: 3,
    stages: [
      {
        id: 'L1',
        name: '入門 — 微習慣起步',
        duration: 7,
        tasks: [
          { id: 's1-1', title: '每餐先吃蛋白質和蔬菜，再吃主食', description: '幫助穩定血糖' },
          { id: 's1-2', title: '飯後不立刻坐下，先站著或慢慢走 10 分鐘', description: '促進葡萄糖吸收' },
          { id: 's1-3', title: '第一餐吃完後保留點心或水果', description: '補充營養' },
        ]
      },
      {
        id: 'L2',
        name: '進階 — 主動行動',
        duration: 7,
        tasks: [
          { id: 's2-1', title: '把含糖飲料替換成白開水或無糖飲品', description: '減少血糖波動' },
          { id: 's2-2', title: '每餐飯後走路 10 分鐘', description: '運動有助血糖穩定' },
          { id: 's2-3', title: '把蜂蜜轉移到早前', description: '時間點很重要' },
        ]
      },
      {
        id: 'L3',
        name: '整合 — 整生活節奏',
        duration: 7,
        tasks: [
          { id: 's3-1', title: '其中一餐的主食開始換成主食類 (飯米、燕麥)', description: '高纖選擇' },
          { id: 's3-2', title: '每天找一段 20 分鐘的運動走路時間', description: '建立習慣' },
          { id: 's3-3', title: '把益生菌移到早上空腹時吃', description: '吸收更好' },
        ]
      },
      {
        id: 'L4',
        name: '完整 — 全方位整合',
        duration: 7,
        tasks: [
          { id: 's4-1', title: '今天不吃精緻甜食（蛋糕、雞尾酒、合成奶料）', description: '關鍵挑戰' },
          { id: 's4-2', title: '每天累積 7000 步', description: '運動目標' },
          { id: 's4-3', title: '起床空腹（感益生菌）、斷食（蕃茄+蛋類）、睡眠（鎂）', description: '完整組合' },
        ]
      }
    ]
  },
  orchid: {
    id: 'orchid',
    name: '蘭花型小課程',
    duration: 14,
    totalTasks: 14,
    participants: 2,
    stages: [
      {
        id: 'L1',
        name: '穩定基礎',
        duration: 7,
        tasks: [
          { id: 'o1-1', title: '建立固定的起床和睡眠時間', description: '穩定節律' },
          { id: 'o1-2', title: '早上曬 15 分鐘太陽', description: '調整生理時鐘' },
          { id: 'o1-3', title: '練習 5 分鐘冥想或呼吸練習', description: '舒緩壓力' },
        ]
      },
      {
        id: 'L2',
        name: '深化穩定',
        duration: 7,
        tasks: [
          { id: 'o2-1', title: '每日進行溫和瑜伽或伸展 20 分鐘', description: '放鬆身體' },
          { id: 'o2-2', title: '記錄每日情緒和壓力水位', description: '自我觀察' },
          { id: 'o2-3', title: '避免咖啡因在下午 3 點後攝入', description: '改善睡眠' },
        ]
      }
    ]
  }
};

// 生成計劃任務
export const generatePlanTasks = (planId, startDateStr) => {
  const plan = coursePlans[planId];
  if (!plan) return [];

  const tasks = [];
  let currentDate = new Date(startDateStr + 'T00:00:00');
  let taskCounter = 1;

  // 為每個階段生成任務
  plan.stages.forEach((stage, stageIndex) => {
    stage.tasks.forEach((stageTask, taskIndex) => {
      // 為該階段的每一天都重複相同的任務內容
      for (let day = 0; day < stage.duration; day++) {
        const taskDate = new Date(currentDate);
        taskDate.setDate(taskDate.getDate() + day);
        const dateStr = taskDate.toISOString().split('T')[0];

        tasks.push({
          id: `plan-${planId}-${stageIndex}-${taskIndex}-${day}`,
          userId: 'demo-user',
          title: stageTask.title,
          details: stageTask.description,
          cue: '📋',
          identity: stageTask.title,
          type: 'binary', // 計劃任務默認為 binary 類型
          category: 'book', // 使用 book 圖標代表課程計劃
          frequency: 'daily',
          status: 'active',
          recurrence: { type: 'daily', interval: 1, weekDays: [1, 2, 3, 4, 5, 6, 0] },
          reminder: { enabled: true, time: '09:00' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          history: {},
          assignmentId: `assignment-${planId}`, // 關聯到計劃
          planId: planId, // 追蹤來自哪個計劃
          planName: plan.name,
        });

        taskCounter++;
      }

      currentDate.setDate(currentDate.getDate() + stage.duration);
    });
  });

  return tasks;
};
