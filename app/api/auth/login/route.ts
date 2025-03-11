// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/User';
import connectToDatabase from '../../../lib/mongodb';
import { generateToken } from '../../../lib/jwt';
import { LoginFormData } from '../../../types';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body: LoginFormData = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      username: user.username,
      isAdmin: user.isAdmin,
    });

    // Return user info and token
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
