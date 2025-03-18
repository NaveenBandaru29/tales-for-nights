// app/api/raw/[id]/route.ts
import { verifyToken } from '@/app/lib/jwt';
import connectToDatabase from '@/app/lib/mongodb';
import Raw from '@/app/models/Raw';
import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Raw from '@/models/Raw';
// import { verifyToken, isAdmin } from '@/lib/auth';

// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

// GET - Get a single RAW by ID
export async function GET(request: NextRequest, { params }: any) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const raw = await Raw.findById(id);
    
    if (!raw) {
      return NextResponse.json(
        { success: false, error: 'RAW not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: raw });
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
    
    const { id } = await params;
    const body = await request.json();
    const { content, pinned } = body;
    
    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Content is required' },
        { status: 400 }
      );
    }
    
    const updatedRaw = await Raw.findByIdAndUpdate(
      id,
      { content, pinned },
      { new: true, runValidators: true }
    );
    
    if (!updatedRaw) {
      return NextResponse.json(
        { success: false, error: 'RAW not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedRaw });
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
    
    const { id } = await params;
    const raw = await Raw.findByIdAndDelete(id);
    
    if (!raw) {
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