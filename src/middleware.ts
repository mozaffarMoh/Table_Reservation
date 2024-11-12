// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Match all paths, but exclude specific patterns
    '/((?!api|_next/static|favicon.ico|static|public))',
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  // Bypass middleware for static files and assets
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/public') ||
    url.pathname.startsWith('/static') ||
    /\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$/.test(url.pathname)
  ) {
    return NextResponse.next(); // Allow static files to proceed normally
  }

  
  return NextResponse.next(); // This ensures the request continues normally without modification
}
