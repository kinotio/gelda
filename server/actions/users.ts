'use server'

import { supabase } from '@/lib/supabase/server'

import { getUser } from '@/server/actions/auth'

export const listAll = async () => {
  await getUser()

  const query = '*'

  const {
    data,
    error: selectError,
    count
  } = await supabase.from('users').select(query, { count: 'exact' })

  if (selectError) throw new Error(`An error occurred while getting users: ${selectError.message}`)

  return { data, count }
}

export const list = async ({
  currentPage = 1,
  perPage = 7
}: {
  currentPage?: number
  perPage?: number
}) => {
  await getUser()

  const query = '*, user_roles (role)'

  const {
    data,
    error: selectError,
    count
  } = await supabase
    .from('users')
    .select(query, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((currentPage - 1) * perPage, currentPage * perPage - 1)

  if (selectError) throw new Error(`An error occurred while getting users: ${selectError.message}`)

  return { data, count }
}
