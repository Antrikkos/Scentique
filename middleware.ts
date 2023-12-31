import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const supplied_token = request.nextUrl.searchParams.get('token')
  const valid_token = process.env.AUTH_TOKEN

  if (supplied_token !== valid_token) {
    const signInUrl = new URL('/', request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/admin/:path*', '/admin/:path*'],
}