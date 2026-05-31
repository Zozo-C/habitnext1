import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const JSON_FIELDS = ['recurrence', 'reminder', 'subtasks', 'metadata'];

function deserializeTask(task) {
    if (!task) return task;
    const out = { ...task };
    for (const f of JSON_FIELDS) {
        if (typeof out[f] === 'string') {
            try { out[f] = JSON.parse(out[f]); } catch { /* keep */ }
        }
    }
    if (out.history) {
        out.history = out.history.map(h => {
            if (typeof h.subtaskCompletions === 'string') {
                try { return { ...h, subtaskCompletions: JSON.parse(h.subtaskCompletions) }; } catch { return h; }
            }
            return h;
        });
    }
    return out;
}

function toStr(val) {
    if (val === null || val === undefined) return val;
    return typeof val === 'string' ? val : JSON.stringify(val);
}

export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const body = await request.json();
        const { historyUpdate, ...taskData } = body;

        await prisma.task.update({
            where: { id },
            data: {
                title: taskData.title,
                details: taskData.details,
                cue: taskData.cue?.trim() || null,
                identity: taskData.identity?.trim() || null,
                type: taskData.type,
                category: taskData.category,
                frequency: taskData.frequency,
                recurrence: toStr(taskData.recurrence),
                reminder: toStr(taskData.reminder),
                subtasks: toStr(taskData.subtasks),
                metadata: toStr(taskData.metadata),
                dailyTarget: taskData.dailyTarget,
                unit: taskData.unit,
                stepValue: taskData.stepValue,
                date: taskData.date,
                time: taskData.time,
                ...(taskData.status !== undefined && ['candidate', 'active', 'paused', 'archived'].includes(taskData.status)
                    ? { status: taskData.status }
                    : {}),
            }
        });

        if (historyUpdate) {
            const { date, completed, value, subtaskCompletions } = historyUpdate;
            const scStr = subtaskCompletions != null ? JSON.stringify(subtaskCompletions) : null;
            await prisma.taskHistory.upsert({
                where: { taskId_date: { taskId: id, date } },
                update: { completed, value, subtaskCompletions: scStr },
                create: { taskId: id, date, completed, value, subtaskCompletions: scStr }
            });
        }

        const finalTask = await prisma.task.findUnique({
            where: { id },
            include: { history: true }
        });

        return NextResponse.json(deserializeTask(finalTask));
    } catch (error) {
        console.error('Update task error:', error);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await prisma.task.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
