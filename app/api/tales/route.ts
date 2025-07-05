// app/api/tales/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Tale from '../../models/Tale';
import connectToDatabase from '../../lib/mongodb';
import { isAdmin } from '../../lib/jwt';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    console.log("Connected to db....")
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;
    const tales = await Tale.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

    // Get total count for pagination
    const total = await Tale.countDocuments();

    return NextResponse.json({
      success: true,
      data: tales,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
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
    const { title, description, content, tags } = body;

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
      tags
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