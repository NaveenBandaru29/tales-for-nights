import { isAdmin } from '@/app/lib/jwt';
import connectToDatabase from '@/app/lib/mongodb';
import Charm from '@/app/models/Charm'
import { NextRequest, NextResponse } from 'next/server';


// GET - Get all Charm with pagination and search
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const skip = (page - 1) * limit;

        // Execute query with pagination
        const charms = await Charm.find()
            .sort({ pinned: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const total = await Charm.countDocuments();

        return NextResponse.json({
            success: true,
            data: charms,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching charms:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST - Create a new charm (admin only)
export async function POST(request: NextRequest) {
    try {
        // Get authorization header

        // Check if user is admin
        if (!isAdmin(request)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 403 }
            );
        }

        await connectToDatabase();

        const body = await request.json();
        const { content, pinned, tags } = body;

        if (!content) {
            return NextResponse.json(
                { success: false, error: 'Content is required' },
                { status: 400 }
            );
        }

        const newCharm = await Charm.create({ content, pinned, tags });

        return NextResponse.json({ success: true, data: newCharm }, { status: 201 });
    } catch (error) {
        console.error('Error creating Charm:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}