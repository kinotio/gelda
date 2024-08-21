'use server'

import { supabase } from '@/lib/supabase/server'

import { TicketFormType, TicketType } from '@/lib/definitions'
import { STATUS_BY_NAME } from '@/lib/constants'

export const list = async ({
  type = 'client',
  limit = 10
}: {
  type?: 'client' | 'admin'
  limit?: number
}) => {
  const { error: sessionError } = await supabase.auth.getSession()

  if (sessionError) throw sessionError

  if (type === 'client') {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) throw userError

    const { data, error: selectError } = await supabase
      .from('tickets')
      .select('*')
      .eq('creator_id', user?.id)
      .limit(limit)

    if (selectError || !data) throw selectError

    return data
  }

  const { data, error: selectError } = await supabase.from('tickets').select('*').limit(10)

  if (selectError || !data) throw selectError

  return data
}

export const create = async (form: TicketFormType) => {
  const { error: sessionError } = await supabase.auth.getSession()

  if (sessionError) throw sessionError

  const data = {
    title: form.title,
    description: form.description,
    priority_id: form.priorityId
  } as TicketType

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError && !user) throw userError

  data.user_id = user?.id as string
  data.status_id = STATUS_BY_NAME.OPEN

  const { data: insertData, error: insertError } = await supabase.from('tickets').insert(data)

  if (insertError) throw insertError

  return insertData
}

export const listTicketPriorities = async () => {
  const { error: sessionError } = await supabase.auth.getSession()

  if (sessionError) throw sessionError

  const { data, error: selectError } = await supabase.from('ticket_priorities').select('*')

  if (selectError || !data) throw selectError

  return data
}
