const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 確保 demo user 存在
    await prisma.user.upsert({
        where: { id: 'demo-user' },
        update: {},
        create: {
            id: 'demo-user',
            nickname: '測試體驗家',
            phone: '0000000000',
            typeKey: 'daisy',
            sleepTypeKey: 'stress',
        },
    });

    // 清掉舊的 demo tasks
    await prisma.task.deleteMany({ where: { userId: 'demo-user' } });

    const today = new Date().toISOString().split('T')[0];

    const tasks = [
        {
            id: 'task-water',
            userId: 'demo-user',
            title: '每日喝水 2000ml',
            type: 'quantitative',
            category: 'droplet',
            frequency: 'daily',
            dailyTarget: 8,
            unit: '杯',
            stepValue: 1,
            recurrence: JSON.stringify({ type: 'daily', interval: 1, endType: 'never' }),
            reminder: JSON.stringify({ enabled: false, offset: 0 }),
            subtasks: JSON.stringify([]),
            status: 'active',
            date: today,
        },
        {
            id: 'task-meditation',
            userId: 'demo-user',
            title: '晨間冥想',
            type: 'binary',
            category: 'yoga',
            frequency: 'daily',
            cue: '起床後',
            recurrence: JSON.stringify({ type: 'daily', interval: 1, endType: 'never' }),
            reminder: JSON.stringify({ enabled: false, offset: 0 }),
            subtasks: JSON.stringify([]),
            status: 'active',
            date: today,
        },
        {
            id: 'task-reading',
            userId: 'demo-user',
            title: '睡前閱讀 30 分鐘',
            type: 'binary',
            category: 'book',
            frequency: 'daily',
            cue: '睡前',
            recurrence: JSON.stringify({ type: 'daily', interval: 1, endType: 'never' }),
            reminder: JSON.stringify({ enabled: false, offset: 0 }),
            subtasks: JSON.stringify([]),
            status: 'active',
            date: today,
        },
        {
            id: 'task-exercise',
            userId: 'demo-user',
            title: '每週運動 3 次',
            type: 'binary',
            category: 'dumbbell',
            frequency: 'weekly',
            recurrence: JSON.stringify({ type: 'weekly', interval: 1, mode: 'period_count', periodTarget: 3, endType: 'never' }),
            reminder: JSON.stringify({ enabled: false, offset: 0 }),
            subtasks: JSON.stringify([]),
            status: 'active',
            date: today,
        },
        {
            id: 'task-sleep',
            userId: 'demo-user',
            title: '23:00 前就寢',
            type: 'binary',
            category: 'moon',
            frequency: 'daily',
            cue: '晚上',
            recurrence: JSON.stringify({ type: 'daily', interval: 1, endType: 'never' }),
            reminder: JSON.stringify({ enabled: false, offset: 0 }),
            subtasks: JSON.stringify([]),
            status: 'active',
            date: today,
        },
    ];

    for (const task of tasks) {
        await prisma.task.create({ data: task });
    }

    // 加一些歷史紀錄（過去 5 天完成狀況）
    const histories = [];
    for (let d = 1; d <= 5; d++) {
        const date = new Date();
        date.setDate(date.getDate() - d);
        const dateStr = date.toISOString().split('T')[0];
        histories.push(
            { taskId: 'task-meditation', date: dateStr, completed: true, value: 1 },
            { taskId: 'task-reading', date: dateStr, completed: d % 2 === 0, value: d % 2 === 0 ? 1 : 0 },
            { taskId: 'task-sleep', date: dateStr, completed: true, value: 1 },
            { taskId: 'task-water', date: dateStr, completed: d < 3, value: d < 3 ? 8 : 5 },
        );
    }

    for (const h of histories) {
        await prisma.taskHistory.upsert({
            where: { taskId_date: { taskId: h.taskId, date: h.date } },
            update: h,
            create: h,
        });
    }

    console.log('✅ Demo 資料塞入完成');
    console.log(`   - ${tasks.length} 個習慣`);
    console.log(`   - ${histories.length} 筆歷史紀錄`);
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
