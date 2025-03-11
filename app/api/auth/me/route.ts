
// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '../../../lib/jwt';

export async function GET(request: NextRequest) {
  try {
    const user = isAuthenticated(request);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Don't send the password back to the client
    // const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}