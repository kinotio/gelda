import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { verifyJwt } from '@/lib/jwt'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('__token')?.value as string
  const url = new URL(req.url)

  if (token) {
    try {
      const { role } = await verifyJwt(token)

      if (url.pathname === '/' || url.pathname.startsWith('/auth')) {
        if (role === 'client') {
          return NextResponse.redirect(new URL('/client', req.url))
        } else if (role === 'admin') {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
      }

      if (role === 'client' && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/client', req.url))
      } else if (role === 'admin' && url.pathname.startsWith('/client')) {
        return NextResponse.redirect(new URL('/admin', req.url))
      }

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
  }

  return NextResponse.next()
}
