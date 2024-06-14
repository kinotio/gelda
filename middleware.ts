import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { verifyJwt } from '@/lib/jwt'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access-token')?.value as string
  const path = request.nextUrl.pathname

  if (!token) {
    if (path === '/' || ['/auth/signin', '/auth/signup'].includes(path)) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  try {
    const { role } = await verifyJwt(token)

    if (path === '/auth/signin' || path === '/auth/signup') {
      return NextResponse.redirect(new URL('/', request.url))
    } else if (role === 'client') {
      if (path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/client', request.url))
      }
      return path.startsWith('/client')
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/client', request.url))
    } else if (role === 'admin') {
      if (path.startsWith('/client')) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return path.startsWith('/admin')
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/admin', request.url))
    }
  } catch (error) {
    request.cookies.delete('access-token')
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

export const config = { matcher: ['/', '/auth/:path*', '/client/:path*', '/admin/:path*'] }
