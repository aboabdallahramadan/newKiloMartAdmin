import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  if (!session && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (session?.role !== 'Admin' && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (request.nextUrl.pathname.includes('/api/')) {
    const modifiedHeaders = new Headers(request.headers);

    // Add the token to the Authorization header
    if (session) {
      modifiedHeaders.set('Authorization', `Bearer ${session}`);
    }

    return NextResponse.next({
      request: {
        headers: modifiedHeaders,
      },
    });
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|auth/signin|favicon.ico|images/logo/logo-dark.svg).*)']
}