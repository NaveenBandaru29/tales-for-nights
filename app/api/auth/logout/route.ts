import { NextResponse } from 'next/server';

// export async function POST() {
//   try {
//     return clearAuthCookie();
//   } catch (error) {
//     console.error('Logout error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

export const POST = async() =>{
  return new Response("User logged out successfully")
}