'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { supabase } from '@/lib/supabase/server'

export const login = async (form: { email: string; password: string }) => {
  const cookieStore = cookies()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  cookieStore.set('sb-access-token', data?.session?.access_token ?? '')
  cookieStore.set('sb-refresh-token', data?.session?.refresh_token ?? '')

  if (error) throw error

  revalidatePath('/', 'layout')
  redirect('/')
}

export const register = async (form: {
  name: string
  email: string
  password: string
  confirmPassword: string
}) => {
  if (form.password !== form.confirmPassword) throw new Error('Passwords do not match')
  const { error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        name: form.name,
        role: 'user'
      }
    }
  })

  if (error) throw error

  revalidatePath('/', 'layout')
  redirect('/')
}

export const logout = async () => {
  const supaCookies = cookies().getAll()

  const { error } = await supabase.auth.signOut()

  if (error) throw error

  supaCookies.map((cookie) => {
    if (cookie.name.includes('sb-')) cookies().delete(cookie.name)
  })

  revalidatePath('/', 'layout')
  redirect('/')
}

export const getUser = async () => {
  let user = null
  const cookieStore = cookies()

  const accessToken = cookieStore.get('sb-access-token')
  const refreshToken = cookieStore.get('sb-refresh-token')

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

  return user
}
