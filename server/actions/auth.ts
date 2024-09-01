'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { isEmpty } from 'lodash'

import { supabase } from '@/lib/supabase/server'

import {
  LoginFormType,
  RegisterFormType,
  UpdateProfileInformationFormType,
  UpdatePasswordFormType
} from '@/lib/definitions'

import { save } from '@/server/actions/activities'

export const login = async (form: LoginFormType) => {
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  if (signInError) throw new Error(`An error occurred while signin: ${signInError.message}`)

  await save({
    type: 'login',
    description: 'Account logged in'
  })

  revalidatePath('/', 'layout')
  redirect('/')
}

export const register = async (form: RegisterFormType) => {
  if (form.password !== form.confirmPassword) throw new Error('Passwords do not match')

  const { data } = await supabase.from('users').select('*').eq('username', form.username)

  if (Array.isArray(data) && data.length > 0) throw new Error('Username already taken')

  const {
    data: { user },
    error: signUpError
  } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        name: form.name,
        username: form.username
      }
    }
  })

  if (signUpError) throw new Error(`An error occurred while signup: ${signUpError.message}`)

  await save({
    user,
    type: 'account_created',
    description: 'User account created'
  })

  revalidatePath('/auth/login', 'layout')
  redirect('/auth/login')
}

export const logout = async () => {
  await save({
    type: 'logout',
    description: 'Account logged out'
  })

  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(`An error occurred while logout: ${error?.message}`)

  cookies()
    .getAll()
    .map((cookie) => cookies().delete(cookie.name))

  revalidatePath('/', 'layout')
  redirect('/')
}

export const getUser = async () => {
  const {
    error: getAuthUserError,
    data: { user }
  } = await supabase.auth.getUser()

  if (getAuthUserError)
    throw new Error(`An error occurred while fetching auth user: ${getAuthUserError?.message}`)

  const query = '*, user_roles (role), inboxes_preferences (preference)'

  const { data: getUserData, error: getUserError } = await supabase
    .from('users')
    .select(query)
    .eq('id', user?.id)
    .limit(1)

  if (getUserError || !getUserData)
    throw new Error(`An error occurred while fetching user: ${getUserError?.message}`)

  if (isEmpty(user)) return logout()

  return getUserData[0]
}

export const getUserRoles = async () => {
  const user = await getUser()

  const { data, error: getUserRolesError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user?.id)
    .limit(1)

  if (getUserRolesError || !data)
    throw new Error(`An error occurred while fetching user roles: ${getUserRolesError.message}`)

  return data
}

export const updateProfileInformation = async (form: UpdateProfileInformationFormType) => {
  const user = await getUser()

  const { error: updateAuthUserError } = await supabase.auth.updateUser({
    email: form.email,
    data: {
      name: form.name,
      username: form.username
    }
  })

  if (updateAuthUserError)
    throw new Error(`An error occurred while updating auth user: ${updateAuthUserError.message}`)

  const { data, error: updateUserError } = await supabase
    .from('users')
    .update({ name: form.name, username: form.username, email: form.email })
    .eq('id', user?.id)

  if (updateUserError)
    throw new Error(`An error occurred while updating user: ${updateUserError.message}`)

  await save({
    type: 'profile_information_change',
    description: 'Account profile information changed'
  })

  return data
}

export const updatePassword = async (form: UpdatePasswordFormType) => {
  await getUser()

  const { data, error } = await supabase.auth.updateUser({
    password: form.newPassword
  })

  if (error)
    throw new Error(`An error occurred while updating auth user password: ${error.message}`)

  await save({
    type: 'password_change',
    description: 'Account password changed'
  })

  return data
}

export const getUserInboxesPreferences = async () => {
  const user = await getUser()

  const { data, error } = await supabase
    .from('inboxes_preferences')
    .select('preference')
    .eq('user_id', user.id)
    .limit(1)

  if (error)
    throw new Error(`An error occurred while getting user inboxes preferences: ${error.message}`)

  return data
}

export const updateUserInboxesPreferences = async (preference: string) => {
  const user = await getUser()

  const { data, error } = await supabase
    .from('inboxes_preferences')
    .update({ preference })
    .eq('user_id', user?.id)

  if (error)
    throw new Error(`An error occurred while updating user inboxes preferences: ${error.message}`)

  await save({
    type: 'inboxes_preferences_change',
    description: 'Account inboxes preferences changed'
  })

  return data
}

export const getUserInboxes = async () => {
  const user = await getUser()

  const { data, error } = await supabase
    .from('inboxes')
    .select('id, message, created_at')
    .eq('user_id', user.id)
    .limit(10)

  if (error) throw new Error(`An error occurred while getting user inboxes: ${error.message}`)

  return data
}
