import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load detailed habit data from seed files
const genesisIOPath = path.join(process.cwd(), 'prisma/seed/genesis-io.json');
const genesisIOHabitsPath = path.join(process.cwd(), 'prisma/seed/genesis-io-habits.json');

let genesisIOData = [];
let genesisIOHabitsData = [];

try {
    console.log('Loading seed data from:', genesisIOPath);
    if (fs.existsSync(genesisIOPath)) {
        genesisIOData = JSON.parse(fs.readFileSync(genesisIOPath, 'utf-8'));
        console.log('Loaded', genesisIOData.length, 'categories');
    } else {
        console.warn('Genesis IO file not found:', genesisIOPath);
    }

    if (fs.existsSync(genesisIOHabitsPath)) {
        genesisIOHabitsData = JSON.parse(fs.readFileSync(genesisIOHabitsPath, 'utf-8'));
        console.log('Loaded', genesisIOHabitsData.length, 'habits');
    } else {
        console.warn('Genesis IO Habits file not found:', genesisIOHabitsPath);
    }
} catch (err) {
    console.error('Error loading seed data:', err);
}

// GET: Fetch comprehensive habit library with all difficulties and metadata
// This is a PUBLIC endpoint (no auth required)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryFilter = searchParams.get('category');

        // Get categories from imported data
        const categories = genesisIOData.map((cat, idx) => ({
            id: `cat-${cat.order}`,
            name: cat.name,
            color: cat.color,
            order: cat.order,
            icon: cat.icon,
        }));

        // Get habits from imported data
        let habits = genesisIOHabitsData.map((habit, idx) => ({
            id: `habit-${idx + 1}`,
            name: habit.name,
            title: habit.name, // Alias for compatibility
            category: habit.category,
            description: habit.description,
            impact: habit.impact,
            ability: habit.ability,
            icon: habit.icon,
            isActive: habit.isActive,
            difficulties: habit.difficulties,
            createdAt: new Date(2026, 4, (idx % 30) + 1).toISOString(),
        }));

        // Filter by category if specified
        if (categoryFilter) {
            habits = habits.filter(h => h.category === categoryFilter);
        }

        // Sort by category order, then by impact (descending)
        const categoryOrderMap = {};
        categories.forEach((cat) => {
            categoryOrderMap[cat.name] = cat.order;
        });

        habits.sort((a, b) => {
            const orderA = categoryOrderMap[a.category] ?? 999;
            const orderB = categoryOrderMap[b.category] ?? 999;
            if (orderA !== orderB) return orderA - orderB;
            return b.impact - a.impact; // Higher impact first
        });

        // Return comprehensive habit data
        return NextResponse.json({
            habits: habits,
            categories: categories,
            totalHabits: habits.length,
            totalCategories: categories.length,
        });

    } catch (error) {
        console.error('Fetch habits error:', error);
        return NextResponse.json({
            error: 'Failed to fetch habits',
            message: error.message
        }, { status: 500 });
    }
}
