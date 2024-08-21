'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { isEmpty } from 'lodash'

import { supabase } from '@/lib/supabase/server'

import { LoginFormType, RegisterFormType } from '@/lib/definitions'

export const login = async (form: LoginFormType) => {
  const cookieStore = cookies()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  cookieStore.set('access-token', data?.session?.access_token ?? '', {
    sameSite: true,
    secure: true
  })
  cookieStore.set('refresh-token', data?.session?.refresh_token ?? '', {
    sameSite: true,
    secure: true
  })

  if (error) throw error

  revalidatePath('/', 'layout')
  redirect('/')
}

export const register = async (form: RegisterFormType) => {
  if (form.password !== form.confirmPassword) throw new Error('Passwords do not match')

  const { data } = await supabase.from('users').select('*').eq('username', form.username)

  if (Array.isArray(data) && data.length > 0) throw new Error('Username already taken')

  const { error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        name: form.name,
        username: form.username
      }
    }
  })

  if (error) throw error

  revalidatePath('/auth/login', 'layout')
  redirect('/auth/login')
}

export const logout = async () => {
  const supaCookies = cookies().getAll()

  const { error } = await supabase.auth.signOut()

  if (error) throw error

  supaCookies.map((cookie) => cookies().delete(cookie.name))

  revalidatePath('/', 'layout')
  redirect('/')
}

export const getUser = async () => {
  let user = null
  const cookieStore = cookies()

  const accessToken = cookieStore.get('access-token')
  const refreshToken = cookieStore.get('refresh-token')

  const { error, data } = await supabase.auth.getUser()

  if (!data.user || error) {
    const {
      data: { user: sessionUser }
    } = await supabase.auth.setSession({
      access_token: accessToken?.value ?? '',
      refresh_token: refreshToken?.value ?? ''
    })

    user = sessionUser
  } else {
    user = data.user
  }

  if (isEmpty(user)) {
    const supaCookies = cookies().getAll()

    supaCookies.map((cookie) => {
      if (cookie.name.includes('sb-')) cookies().delete(cookie.name)
    })
  }

  return user
}
