// lib/jwt.ts
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

export interface JwtPayload {
  userId: string;
  username: string;
  isAdmin: boolean;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.split(' ')[1];
}

export function getUserFromRequest(req: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

export function isAuthenticated(req: NextRequest): boolean {
  return getUserFromRequest(req) !== null;
}

export function isAdmin(req: NextRequest): boolean {
  const user = getUserFromRequest(req);
  return user ? user.isAdmin : false;
}

// export const isAuthenticated = (request:NextRequest) =>{
//     const token = request.headers.get("authorization")?.split(" ")[1]
    
//     if(!token){
//       return new Response("Token not found.",{status:401})
//     }
//     let user = verifyToken(token)
//     if(!user){
//       return new Response("User not found")
//     }
//     return user

// }

// 
// export const isAdmin = (request: NextRequest): boolean | Response => {
//   const user = isAuthenticated(request);

//   // If isAuthenticated returned a Response, return that directly
//   if (user instanceof Response) {
//     return user;
//   }

//   return user.isAdmin;
// }