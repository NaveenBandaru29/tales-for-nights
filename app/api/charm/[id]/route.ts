import { isAdmin } from '@/app/lib/jwt';
import connectToDatabase from '@/app/lib/mongodb';
import Charm from '@/app/models/Charm';
import { NextRequest, NextResponse } from 'next/server';

// GET - Get a single RAW by ID
export async function GET(request: NextRequest, { params }: any) {
    try {
        await connectToDatabase();

        const { id } = await params;
        const charm = await Charm.findById(id);

        if (!charm) {
            return NextResponse.json(
                { success: false, error: 'RAW not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: charm });
    } catch (error) {
        console.error('Error fetching RAW:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update a RAW (admin only)
export async function PUT(request: NextRequest, { params }: any) {
    try {
        // Get authorization heade    
        // Check if user is admin
        if (!isAdmin(request)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized - Admin access required' },
                { status: 403 }
            );
        }

        await connectToDatabase();

        const { id } = await params;
        const body = await request.json();
        const { content, pinned, tags } = body;

        if (!content) {
            return NextResponse.json(
                { success: false, error: 'Content is required' },
                { status: 400 }
            );
        }

        const updatedCharm = await Charm.findByIdAndUpdate(
            id,
            { content, pinned, tags },
            { new: true, runValidators: true }
        );

        if (!updatedCharm) {
            return NextResponse.json(
                { success: false, error: 'RAW not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updatedCharm });
    } catch (error) {
        console.error('Error updating RAW:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a RAW (admin only)
export async function DELETE(request: NextRequest, { params }: any) {
    try {
        // Check if user is admin
        if (!isAdmin(request)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized - Admin access required' },
                { status: 403 }
            );
        }

        await connectToDatabase();

        const { id } = await params;
        const charm = await Charm.findByIdAndDelete(id);

        if (!charm) {
            return NextResponse.json(
                { success: false, error: 'RAW not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: { id } });
    } catch (error) {
        console.error('Error deleting RAW:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}