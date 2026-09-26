import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

export async function proxy(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/login';

  if (!isAdminRoute && !isLoginRoute) {
    return NextResponse.next();
  }

  // 1. Get the token from cookies
  const token = request.cookies.get('techtweak_session')?.value;
  
  // 2. Verify token if it exists
  const session = token ? await verifyToken(token) : null;
  const user = session ? session : null;

  // 3. If trying to access admin and not logged in, redirect to login
  if (isAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 4. If trying to access login while already logged in, redirect to admin
  if (isLoginRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  // 5. Proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
