import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const JSON_FIELDS = ['recurrence', 'reminder', 'subtasks', 'metadata'];

function deserializeTask(task) {
    if (!task) return task;
    const out = { ...task };
    for (const f of JSON_FIELDS) {
        if (typeof out[f] === 'string') {
            try { out[f] = JSON.parse(out[f]); } catch { /* keep as-is */ }
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

function serializeTask(data) {
    const out = { ...data };
    for (const f of JSON_FIELDS) {
        if (f in out && out[f] !== undefined && typeof out[f] !== 'string') {
            out[f] = JSON.stringify(out[f]);
        }
    }
    return out;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const assignmentId = searchParams.get('assignmentId');
    const status = searchParams.get('status') || 'active';

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    try {
        const where = { userId };
        if (assignmentId) where.assignmentId = assignmentId;
        if (status !== 'all') where.status = status;

        const tasks = await prisma.task.findMany({
            where,
            include: { history: true },
            orderBy: { createdAt: 'asc' }
        });
        return NextResponse.json(tasks.map(deserializeTask));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, ...taskData } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const status = ['candidate', 'active', 'archived'].includes(taskData.status) ? taskData.status : 'candidate';

        const raw = {
            userId,
            title: taskData.title,
            details: taskData.details,
            cue: taskData.cue?.trim() || null,
            identity: taskData.identity?.trim() || null,
            type: taskData.type,
            category: taskData.category,
            frequency: taskData.frequency,
            recurrence: taskData.recurrence || {},
            reminder: taskData.reminder || {},
            subtasks: taskData.subtasks || [],
            dailyTarget: taskData.dailyTarget,
            unit: taskData.unit,
            stepValue: taskData.stepValue,
            date: taskData.date,
            time: taskData.time,
            status,
            officialHabitId: taskData.officialHabitId ?? null,
        };

        const task = await prisma.task.create({
            data: serializeTask(raw),
            include: { history: true }
        });

        return NextResponse.json(deserializeTask(task));
    } catch (error) {
        console.error('Create task error:', error);
        return NextResponse.json({ error: `Failed to create task: ${error.message}` }, { status: 500 });
    }
}
