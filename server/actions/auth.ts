'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { supabase } from '@/lib/supabase/server'

export const login = async (form: { email: string; password: string }) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  if (error) throw new Error(error.message)

  revalidatePath('/u/overview', 'layout')
  redirect('/u/overview')
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
        name: form.name
      }
    }
  })

  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/')
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/')
}

export const getUser = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user
}
