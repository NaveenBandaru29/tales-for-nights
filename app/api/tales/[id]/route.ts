
// app/api/tales/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Tale from '../../../models/Tale';
import connectToDatabase from '../../../lib/mongodb';
import { isAdmin } from '../../../lib/jwt';
import mongoose from 'mongoose';

// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tale ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const tale = await Tale.findById(id);

    if (!tale) {
      return NextResponse.json(
        { success: false, error: 'Tale not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tale,
    });
  } catch (error) {
    console.error('Error fetching tale:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    // Check if user is admin
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tale ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const body = await request.json();
    const { title, description, content } = body;

    if (!title && !description && !content) {
      return NextResponse.json(
        { success: false, error: 'At least one field to update is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (content) updateData.content = content;

    const tale = await Tale.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!tale) {
      return NextResponse.json(
        { success: false, error: 'Tale not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tale,
    });
  } catch (error) {
    console.error('Error updating tale:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    // Check if user is admin
    if (!isAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tale ID' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    const tale = await Tale.findByIdAndDelete(id);

    if (!tale) {
      return NextResponse.json(
        { success: false, error: 'Tale not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id },
    });
  } catch (error) {
    console.error('Error deleting tale:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}