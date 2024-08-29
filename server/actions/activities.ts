'use server'

import { User } from '@supabase/supabase-js'

import { supabase } from '@/lib/supabase/server'
import { ActivitiesType } from '@/lib/definitions'

import { getUser } from '@/server/actions/auth'

export const list = async ({
  currentPage = 1,
  perPage = 6
}: {
  currentPage?: number
  perPage?: number
}) => {
  const user = await getUser()

  const { data, error, count } = await supabase
    .from('activities')
    .select('id, type, description, device, timestamp', { count: 'exact' })
    .eq('user_id', user.id)
    .order('timestamp', { ascending: false })
    .range((currentPage - 1) * perPage, currentPage * perPage - 1)

  if (error) throw new Error(`An error occurred while listing activities: ${error.message}`)

  return { data, count }
}

export const save = async ({
  user,
  type,
  description
}: {
  user?: User | null
  type: ActivitiesType
  description: string
}) => {
  const userFromSession = await getUser()

  const { device } = await (await fetch(`${process.env.APP_URL}/api/device`)).json()

  const { data, error } = await supabase.from('activities').insert({
    type,
    description,
    device,
    user_id: user?.id ?? userFromSession.id
  })

  if (error) throw new Error(`An error occurred while saving activity: ${error.message}`)

  return data
}
