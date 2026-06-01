// Explore Plan Sections (mock — replace with DB data when ready)
export const explorePlanSections = [
  {
    id: 'flower',
    category: '花朵型小課程',
    emoji: '🌸',
    subtitle: '女性依體質分型，14 天分階段任務，跟著週期長出自己的花。',
    quizCard: { themeColor: '#FF6B6B', tag: '花朵型', title: '還不知道自己是哪種型嗎？', description: '填寫問卷，找到最適合你的花朵型計畫。', imageUrl: '/images/course-flower.svg' },
    templates: [
      { id: 'sunflower', name: '向日葵型小課程', tag: '花朵型', color: '#FFF3CD', accent: '#F59E0B', emoji: '🌻', by: 'HabitNext 系統', description: '你像向日葵一樣會隨著能量消長與代謝節律而轉動，血糖波動大、容易餓、飯後想睡是常見困擾。', count: 3 },
      { id: 'orchid',    name: '蘭花型小課程',   tag: '花朵型', color: '#FCE4EC', accent: '#E91E8C', emoji: '🌸', by: 'HabitNext 系統', description: '你像蘭花一樣對環境變化比較敏感，需要穩定以及規律來支撐，當作息混亂壓力來襲時容易失衡。', count: 2 },
      { id: 'rose',      name: '玫瑰型小課程',   tag: '花朵型', color: '#FCE4EC', accent: '#F06292', emoji: '🌹', by: 'HabitNext 系統', description: '你像玫瑰一樣有盛開與含苞的節奏，身體對週期變化比較敏銳，尤其是情緒與體力的起伏。', count: 5 },
      { id: 'daisy',     name: '雛菊型小課程',   tag: '花朵型', color: '#E8F5E9', accent: '#4CAF50', emoji: '🌼', by: 'HabitNext 系統', description: '你像雛菊一樣穩定、日常、自然且平衡。大多數時候沒有特別明顯的不適，但這不代表不需要照顧自己。', count: 7 },
    ],
  },
  {
    id: 'sleep',
    category: '睡眠處方',
    emoji: '🌙',
    subtitle: '依睡眠困擾分型，以科學方法重建睡眠節律。',
    quizCard: { themeColor: '#169E6B', tag: '睡眠處方', title: '還不知道自己是哪種型嗎？', description: '填寫問卷，找到最適合你的睡眠處方。', imageUrl: '/images/course-sleep.svg' },
    templates: [
      { id: 'stress-sleep',    name: '壓力型睡眠處方',     tag: '睡眠', color: '#EDE7F6', accent: '#7C3AED', emoji: '😵‍💫', by: 'HabitNext 系統', description: '大腦過度活躍、交感神經亢奮，明明很累卻睡不著，睡前思緒停不下來。', count: 4 },
      { id: 'rhythm-sleep',    name: '節律型睡眠處方',     tag: '睡眠', color: '#E3F2FD', accent: '#1E88E5', emoji: '🌙', by: 'HabitNext 系統', description: '生理時鐘延遲或混亂，不是睡不著，而是睡錯時間；晚睡晚起、週末補眠惡化節律。', count: 6 },
      { id: 'metabolic-sleep', name: '代謝失衡型睡眠處方',  tag: '睡眠', color: '#FFF3E0', accent: '#FB8C00', emoji: '⏰', by: 'HabitNext 系統', description: '夜間血糖波動、低血糖反應導致半夜醒來、睡眠不穩、醒來依然疲憊。', count: 3 },
      { id: 'hormone-sleep',   name: '荷爾蒙波動型睡眠處方', tag: '睡眠', color: '#FCE4EC', accent: '#E91E63', emoji: '🔄', by: 'HabitNext 系統', description: '荷爾蒙波動影響體溫調節、情緒與睡眠深度，常見於經前、更年期、產後。', count: 2 },
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
