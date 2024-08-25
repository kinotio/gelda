'use server'

import { supabase } from '@/lib/supabase/server'
import { ActivityType, ActivitiesType } from '@/lib/definitions'

import { getUser } from '@/server/actions/auth'

const DEFAULT_ACTIVITIES_PER_PAGE = 10

export const list = async ({ limit = DEFAULT_ACTIVITIES_PER_PAGE }: { limit?: number }) => {
  const user = await getUser()

  const { data, error } = await supabase
    .from('activities')
    .select('id, type, description, timestamp')
    .eq('user_id', user.id)
    .limit(limit)
    .order('timestamp', { ascending: false })

  if (error) throw new Error(`An error occurred while listing activities: ${error.message}`)

  return data as ActivityType[]
}

export const save = async ({
  type,
  description
}: {
  type: ActivitiesType
  description: string
}) => {
  const user = await getUser()

  const { data, error } = await supabase.from('activities').insert({
    type,
    description,
    user_id: user.id
  })

  if (error) throw new Error(`An error occurred while saving activity: ${error.message}`)

  return data
}
