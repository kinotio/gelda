import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { verify } from '@/lib/jsonwebtoken'

import { PATH, TOKEN_NAME, ROLE_BY_NAME } from '@/lib/constants'

const middleware = async (request: NextRequest) => {
  const token = request.cookies.get(TOKEN_NAME)?.value as string
  const path = request.nextUrl.pathname

  if (!token) {
    if (path === PATH.HOME) {
      return NextResponse.redirect(new URL(PATH.SIGNIN, request.url))
    } else if ([PATH.SIGNIN, PATH.SIGNUP].includes(path)) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL(PATH.SIGNIN, request.url))
  }

  try {
    const verifiedToken = await verify(token)
    const roleId = verifiedToken ? verifiedToken.role_id : null

    if (path === PATH.SIGNIN || path === PATH.SIGNUP) {
      return NextResponse.redirect(new URL(PATH.HOME, request.url))
    } else if (roleId === ROLE_BY_NAME.CLIENT) {
      if (path.startsWith(PATH.ADMIN)) {
        return NextResponse.redirect(new URL(PATH.CLIENT, request.url))
      }

      return path.startsWith(PATH.CLIENT)
        ? NextResponse.next()
        : NextResponse.redirect(new URL(PATH.CLIENT, request.url))
    } else if (roleId === ROLE_BY_NAME.ADMIN) {
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

export { middleware }
