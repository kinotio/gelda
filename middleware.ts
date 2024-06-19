import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { verifyJwt } from '@/lib/jwt'

import { PATH, TOKEN_NAME, ROLE_BY_NAME } from '@/utils/constants'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value as string
  const path = request.nextUrl.pathname

  if (!token) {
    if (path === PATH.HOME || [PATH.SIGNIN, PATH.SIGNUP].includes(path)) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL(PATH.SIGNIN, request.url))
  }

  try {
    const { role_id } = await verifyJwt(token)

    if (path === PATH.SIGNIN || path === PATH.SIGNUP) {
      return NextResponse.redirect(new URL(PATH.HOME, request.url))
    } else if (role_id === ROLE_BY_NAME.CLIENT) {
      if (path.startsWith(PATH.ADMIN)) {
        return NextResponse.redirect(new URL(PATH.CLIENT, request.url))
      }

      return path.startsWith(PATH.CLIENT)
        ? NextResponse.next()
        : NextResponse.redirect(new URL(PATH.CLIENT, request.url))
    } else if (role_id === ROLE_BY_NAME.ADMIN) {
      if (path.startsWith(PATH.CLIENT)) {
        return NextResponse.redirect(new URL(PATH.ADMIN_DASHBOARD, request.url))
      }

      return path.startsWith(PATH.ADMIN)
        ? NextResponse.next()
        : NextResponse.redirect(new URL(PATH.ADMIN_DASHBOARD, request.url))
    }
  } catch (error) {
    return NextResponse.redirect(new URL(PATH.SIGNIN, request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/', '/auth/:path*', '/client/:path*', '/admin/:path*'] }
