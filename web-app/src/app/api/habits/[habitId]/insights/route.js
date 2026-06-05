import { NextResponse } from 'next/server';

// Mock Habit Insights - 只有幾筆用來測試 UI
const mockInsights = {
  'habit-4': [
    {
      id: 'insight-4-1',
      habitId: 'habit-4',
      title: '定期健檢的預防力量',
      takeaway: '年度檢查能在症狀出現前發現慢性病風險，預防勝於治療。',
      summary: '定期健康檢查是預防慢性病的黃金策略，能早期發現代謝異常、腫瘤標記異常等。',
      detail: `## 預防醫學的核心

預防醫學分三層：一級預防（健康教育）、二級預防（早期篩檢）、三級預防（治療管理）。定期健檢屬於二級預防，是最具成本效益的健康投資。

## 台灣成人健檢指南

- 40-65 歲：每3年1次免費成人健檢
- 65 歲以上：每年1次
- 高風險族群（糖尿病史、高血脂）：每年1次`,
      evidence: {
        rating: 'high',
        label: '證據力強',
        score: 5,
        description: '全球衛生組織與醫學會一致推薦，有充分的流行病學證據支持。'
      },
      sources: [
        {
          type: 'journal',
          label: 'Lancet: 預防醫學特刊',
          url: 'https://www.thelancet.com'
        },
        {
          type: 'book',
          label: '衛福部《成人健康檢查實施方案》'
        }
      ],
      tags: ['預防醫學', '早期篩檢', '慢性病防治']
    }
  ],
  'habit-6': [
    {
      id: 'insight-6-1',
      habitId: 'habit-6',
      title: '膳食纖維與腸道健康',
      takeaway: '足夠的纖維攝取能穩定血糖、降低膽固醇、維持腸道益菌。',
      summary: '膳食纖維是腸道益菌的食物來源，幫助規律排便、穩定血糖、降低心血管疾病風險。',
      detail: `## 纖維的雙重作用

可溶性纖維（燕麥、豆類）：降低膽固醇、穩定血糖
不溶性纖維（全穀、蔬菜）：促進腸蠕動、增加飽足感

## 每日目標量

- 成人：25-30 克/天
- 台灣人平均攝取：僅 15-18 克，明顯不足

## 增加攝取的小訣竅

- 選擇全穀主食（糙米、燕麥、全麥麵包）
- 每天吃 5 份蔬果（1 份 = 1 碗生菜或 1/2 碗熟菜）
- 使用豆類取代部分肉類`,
      evidence: {
        rating: 'high',
        label: '證據力強',
        score: 5,
        description: '數百項研究確認，是營養學公認的健康要素。'
      },
      sources: [
        {
          type: 'journal',
          label: 'American Journal of Clinical Nutrition',
          url: 'https://academic.oup.com/ajcn'
        },
        {
          type: 'pubmed',
          label: 'PubMed 膳食纖維研究薈萃分析',
          url: 'https://www.ncbi.nlm.nih.gov/pubmed'
        }
      ],
      tags: ['營養', '腸道健康', '慢性病預防']
    }
  ],
  'habit-1': [
    {
      id: 'insight-1-1',
      habitId: 'habit-1',
      title: '腹式呼吸的副交感啟動',
      takeaway: '慢速呼吸能快速降低心率，5 分鐘內明顯緩解壓力。',
      summary: '腹式呼吸激活迷走神經，切換身體進入副交感神經模式，是最快速的自然放鬆方法。',
      detail: `## 自主神經科學

交感神經：戰鬥或逃跑反應（心率↑、皮質醇↑）
副交感神經：休息和消化模式（心率↓、消化↑）

呼吸是唯一能同時受意識控制和自動調節的神經功能！

## 4-4-6 呼吸法

1. 鼻吸4秒（腹部隆起）
2. 屏息4秒
3. 嘴呼6秒（呼氣比吸氣長，強化副交感效果）
4. 重複5-10次，共2-3分鐘

適用場景：工作壓力、考試焦慮、失眠、驚恐發作`,
      evidence: {
        rating: 'high',
        label: '證據力強',
        score: 5,
        description: '神經科學確認，美軍特種部隊與運動員廣泛採用。'
      },
      sources: [
        {
          type: 'journal',
          label: 'Frontiers in Psychology: 呼吸與自主神經',
          url: 'https://www.frontiersin.org/psychology'
        },
        {
          type: 'book',
          label: '《呼吸》- James Nestor 著'
        }
      ],
      tags: ['壓力管理', '呼吸法', '神經調節']
    }
  ]
};

export async function GET(request, { params }) {
  try {
    const { habitId } = params;
    const insights = mockInsights[habitId] || [];

    return NextResponse.json(insights);
  } catch (error) {
    console.error('Fetch insights error:', error);
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}
