// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAdmin, isAuthenticated } from './app/lib/jwt';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Admin routes protection
  // if (path.startsWith('/admin')) {
  //   if (!isAuthenticated(request)) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
    
  //   if (!isAdmin(request)) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};