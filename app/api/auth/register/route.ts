
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/User';
import connectToDatabase from '../../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Create new user (first user is admin by default for simplicity)
    const isFirstUser = (await User.countDocuments({})) === 0;
    
    const user = new User({
      username,
      password,
      isAdmin: isFirstUser,
    });

    await user.save();

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}