// app/api/raw/route.ts
import { verifyToken } from '@/app/lib/jwt';
import connectToDatabase from '@/app/lib/mongodb';
import Raw from '@/app/models/Raw';
import { NextRequest, NextResponse } from 'next/server';

// GET - Get all RAWs with pagination and search
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    // Build query
    const query = search ? { $text: { $search: search } } : {};
    
    // Execute query with pagination
    const raws = await Raw.find(query)
      .sort({ pinned:-1,createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Raw.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: raws,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching RAWs:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new RAW (admin only)
export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);
    
    // Check if user is admin
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }
    
    await connectToDatabase();
    
    const body = await request.json();
    const { content,pinned } = body;
    
    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }
    
    const newRaw = await Raw.create({ content,pinned });
    
    return NextResponse.json({ success: true, data: newRaw }, { status: 201 });
  } catch (error) {
    console.error('Error creating RAW:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}