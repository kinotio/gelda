import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { User, SupabaseClient } from '@supabase/supabase-js'
import { isEmpty } from 'lodash'

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
  const { data: userRole, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user?.id)
    .limit(1)

  if (error || !userRole) {
    throw new Error(`An error occurred while getting user role: ${error?.message}`)
  }

  return userRole
}

const isProtectedRoute = (pathname: string): boolean => {
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

const handleUnauthenticatedClient = (
  user: User | null,
  role: string,
  request: NextRequest
): NextResponse => {
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

  if (role === 'client' && request.nextUrl.pathname === PATH.HOME) {
    const url = request.nextUrl.clone()
    url.pathname = PATH.CLIENT_OVERVIEW
    return NextResponse.redirect(url)
  }

  if (role === 'client' && request.nextUrl.pathname.startsWith(PATH.ADMIN)) {
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
    if (isEmpty(role)) targetPath = PATH.ADMIN_DASHBOARD
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

  const accessToken = cookieStore.get('access-token')
  const refreshToken = cookieStore.get('refresh-token')

  const { error, data } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  let role = null

  if (!data.user || error) {
    const {
      data: { user: sessionUser }
    } = await supabase.auth.setSession({
      access_token: accessToken?.value ?? '',
      refresh_token: refreshToken?.value ?? ''
    })

    if (sessionUser) {
      const userRole = await handleGettingUserRole({ supabase, user: sessionUser })
      role = userRole[0].role
    }

    if (isProtectedRoute(pathname)) {
      return isApiRoute(pathname)
        ? handleUnauthenticatedApi()
        : handleUnauthenticatedClient(sessionUser, role, request)
    }
  } else {
    const userRole = await handleGettingUserRole({ supabase, user: data.user })
    role = userRole[0].role

    if (isProtectedRoute(pathname)) {
      return isApiRoute(pathname)
        ? handleUnauthenticatedApi()
        : handleUnauthenticatedClient(data.user, role, request)
    }
  }

  return response
}
