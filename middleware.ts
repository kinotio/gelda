import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { User, SupabaseClient } from '@supabase/supabase-js'

import { PATH } from '@/lib/constants'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

const protectedRoutes = ['/', '/c', '/a']

export const config = {
  matcher: ['/', '/auth/:path*', '/c/:path*', '/a/:path*']
}

const handleGettingUserRole = async ({
  supabase,
  user
}: {
  supabase: SupabaseClient<any, 'public', any>
  user: User | null
}) => {
  const { data } = await supabase.from('user_roles').select('role').eq('user_id', user?.id).limit(1)
  return data
}

const isProtectedRoute = (pathname: string): boolean => {
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

const handleUnauthenticatedClient = (
  user: User | null,
  role: string,
  request: NextRequest
): NextResponse => {
  const url = request.nextUrl.clone()

  if (
    (!user && request.nextUrl.pathname === PATH.HOME) ||
    (!user && !request.nextUrl.pathname.startsWith(PATH.AUTH))
  ) {
    url.pathname = PATH.LOGIN
    return NextResponse.redirect(url)
  }

  if (role === 'client' && request.nextUrl.pathname === PATH.CLIENT) {
    url.pathname = PATH.CLIENT_OVERVIEW
    return NextResponse.redirect(url)
  }

  if (role === 'admin' && request.nextUrl.pathname === PATH.ADMIN) {
    url.pathname = PATH.ADMIN_DASHBOARD
    return NextResponse.redirect(url)
  }

  if (
    (role === 'client' && request.nextUrl.pathname === PATH.HOME) ||
    (role === 'client' && request.nextUrl.pathname.startsWith(PATH.ADMIN))
  ) {
    url.pathname = PATH.CLIENT_OVERVIEW
    return NextResponse.redirect(url)
  }

  if (
    (role === 'admin' && request.nextUrl.pathname === PATH.HOME) ||
    (role === 'admin' && request.nextUrl.pathname.startsWith(PATH.CLIENT))
  ) {
    url.pathname = PATH.ADMIN_DASHBOARD
    return NextResponse.redirect(url)
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

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request
  })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      }
    }
  })

  const { pathname } = request.nextUrl

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const userRole = await handleGettingUserRole({ supabase, user: user })
  const role = userRole?.[0]?.role

  if (isProtectedRoute(pathname)) {
    return isApiRoute(pathname)
      ? handleUnauthenticatedApi()
      : handleUnauthenticatedClient(user, role, request)
  }

  return supabaseResponse
}
