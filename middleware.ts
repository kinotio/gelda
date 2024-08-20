import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { isEmpty } from 'lodash'

import { PATH } from '@/lib/constants'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

const protectedRoutes = ['/', '/u', '/c']

export const config = {
  matcher: ['/', '/auth/:path*', '/u/:path*', '/c/:path*']
}

const isProtectedRoute = (pathname: string): boolean => {
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

const handleUnauthenticatedClient = (user: User | null, request: NextRequest): NextResponse => {
  if (!user && request.nextUrl.pathname === PATH.HOME) {
    const url = request.nextUrl.clone()
    url.pathname = PATH.LOGIN
    return NextResponse.redirect(url)
  }

  if (!user && !request.nextUrl.pathname.startsWith(PATH.AUTH)) {
    const url = request.nextUrl.clone()
    url.pathname = PATH.LOGIN
    return NextResponse.redirect(url)
  }

  const userRole = user?.user_metadata?.role

  if (userRole === 'user' && request.nextUrl.pathname === PATH.HOME) {
    const url = request.nextUrl.clone()
    url.pathname = PATH.CLIENT_OVERVIEW
    return NextResponse.redirect(url)
  }

  if (userRole === 'user' && request.nextUrl.pathname.startsWith(PATH.ADMIN)) {
    const url = request.nextUrl.clone()
    url.pathname = PATH.CLIENT_OVERVIEW
    return NextResponse.redirect(url)
  }

  if (
    (user && request.nextUrl.pathname.startsWith(PATH.AUTH)) ||
    (user && request.nextUrl.pathname.startsWith(PATH.CLIENT)) ||
    (user && request.nextUrl.pathname.startsWith(PATH.ADMIN))
  ) {
    const url = request.nextUrl.clone()
    let targetPath = PATH.CLIENT_OVERVIEW
    if (isEmpty(userRole)) targetPath = PATH.ADMIN_DASHBOARD
    if (request.nextUrl.pathname !== targetPath) {
      url.pathname = targetPath
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

const handleUnauthenticatedApi = (): NextResponse => {
  return new NextResponse(JSON.stringify({ success: false, message: 'authentication failed' }), {
    status: 401,
    headers: { 'content-type': 'application/json' }
  })
}

const isApiRoute = (pathname: string): boolean => {
  if (pathname.startsWith('/api')) return true
  else return false
}

const createSupabaseServerClient = (request: NextRequest, response: NextResponse) => {
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        response = NextResponse.next({
          request
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      }
    }
  })

  return supabase
}

export const middleware = async (request: NextRequest) => {
  const cookieStore = cookies()

  let response = NextResponse.next({ request })
  const supabase = createSupabaseServerClient(request, response)

  const accessToken = cookieStore.get('sb-access-token')
  const refreshToken = cookieStore.get('sb-refresh-token')

  const { error, data } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (!data.user || error) {
    const {
      data: { user: sessionUser }
    } = await supabase.auth.setSession({
      access_token: accessToken?.value ?? '',
      refresh_token: refreshToken?.value ?? ''
    })

    if (isProtectedRoute(pathname)) {
      return isApiRoute(pathname)
        ? handleUnauthenticatedApi()
        : handleUnauthenticatedClient(sessionUser, request)
    }
  } else {
    if (isProtectedRoute(pathname)) {
      return isApiRoute(pathname)
        ? handleUnauthenticatedApi()
        : handleUnauthenticatedClient(data.user, request)
    }
  }

  return response
}
