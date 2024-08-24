'use server'

import { ActivityType } from '@/lib/definitions'
import { supabase } from '@/lib/supabase/server'

import { getUser } from '@/server/actions/auth'

const DEFAULT_ACTIVITIES_PER_PAGE = 10

export const list = async ({ limit = DEFAULT_ACTIVITIES_PER_PAGE }: { limit?: number }) => {
  const user = await getUser()

  const { data, error } = await supabase
    .from('activities')
    .select('id, type, description, timestamp')
    .eq('user_id', user.id)
    .limit(limit)

  if (error) throw new Error(`An error occurred while listing activities: ${error.message}`)

  return data as ActivityType[]
}
