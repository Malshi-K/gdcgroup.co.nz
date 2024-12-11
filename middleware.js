import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
  // Clean the URL - replace encoded spaces and special characters
  if (url.pathname.includes('%20')) {
    const cleanPath = url.pathname
      .replace(/%20/g, '-')
      .toLowerCase()
      .trim()
    
    // Create new URL with cleaned path
    url.pathname = cleanPath
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: '/services/:path*'
}