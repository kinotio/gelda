import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { verifyJwt } from '@/lib/jwt'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access-token')?.value as string
  const url = new URL(request.url)

  if (token) {
    try {
      const { role } = await verifyJwt(token)

      if (url.pathname === '/' || url.pathname.startsWith('/auth')) {
        if (role === 'client') {
          return NextResponse.redirect(new URL('/client', request.url))
        } else if (role === 'admin') {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      }

      if (role === 'client' && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/client', request.url))
      } else if (role === 'admin' && url.pathname.startsWith('/client')) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = { matcher: ['/', '/auth/:path*', '/client/:path*', '/admin/:path*'] }
