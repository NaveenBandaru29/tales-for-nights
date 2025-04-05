// app/api/tales/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Tale from '../../models/Tale';
import connectToDatabase from '../../lib/mongodb';
import { isAdmin } from '../../lib/jwt';

export async function GET() {
  try {
    await connectToDatabase();
    console.log("Connected to db....")
    const tales = await Tale.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: tales,
    });
  } catch (error) {
    console.error('Error fetching tales:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const body = await request.json();
    const { title, description, content } = body;

    if (!title || !description || !content) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and content are required' },
        { status: 400 }
      );
    }

    const tale = new Tale({
      title,
      description,
      content,
    });

    await tale.save();

    return NextResponse.json({
      success: true,
      data: tale,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating tale:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}