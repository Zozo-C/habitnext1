import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
    try {
        const user = await prisma.user.upsert({
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
        return NextResponse.json(user);
    } catch (error) {
        console.error('Demo user create error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
