// import { NextRequest, NextResponse } from 'next/server';
// import { db } from './db';
// import { User } from '../types';
// // import { generateToken, verifyToken } from './jwt';

// // For simplicity, using a JWT-like token approach
// // In production, use a proper environment variable

// export function generateToken(user: User): string {
//   // In a real app, use a proper JWT library
//   const payload = {
//     id: user.id,
//     username: user.username,
//     isAdmin: user.isAdmin,
//     exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
//   };
  
//   return Buffer.from(JSON.stringify(payload)).toString('base64');
// }

// export function verifyToken(token: string): User | null {
//   try {
//     const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
//     // Check if token is expired
//     if (payload.exp < Math.floor(Date.now() / 1000)) {
//       return null;
//     }
    
//     return {
//       id: payload.id,
//       username: payload.username,
//       isAdmin: payload.isAdmin,
//       password: '', // We don't include password in the token
//     };
//   } catch (error) {
//     return null;
//   }
// }

// export function isAuthenticated(request: NextRequest): User | null {
//   const token = request.cookies.get('auth_token')?.value;
  
//   if (!token) {
//     return null;
//   }
  
//   return verifyToken(token);
// }

// export function isAdmin(request: NextRequest): boolean {
//   const user = isAuthenticated(request);
//   return user ? user.isAdmin : false;
// }

// export function createAuthCookie(user: User): NextResponse {
//   const token = generateToken(user);
//   const response = NextResponse.json({ success: true, user });
  
//   response.cookies.set({
//     name: 'auth_token',
//     value: token,
//     httpOnly: true,
//     maxAge: 60 * 60 * 24, // 24 hours
//     path: '/',
//   });
  
//   return response;
// }

// export function clearAuthCookie(): NextResponse {
//   const response = NextResponse.json({ success: true });
  
//   response.cookies.set({
//     name: 'auth_token',
//     value: '',
//     httpOnly: true,
//     maxAge: 0,
//     path: '/',
//   });
  
//   return response;
// }

