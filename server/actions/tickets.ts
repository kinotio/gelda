'use server'

import { supabase } from '@/lib/supabase/server'

import { TicketFormType, TicketType } from '@/lib/definitions'
import { STATUS_BY_NAME } from '@/lib/constants'

const DEFAULT_TYPE = 'client'
const DEFAULT_TICKETS_PER_PAGE = 10

export const list = async ({
  type = DEFAULT_TYPE,
  limit = DEFAULT_TICKETS_PER_PAGE
}: {
  type?: 'client' | 'admin'
  limit?: number
}) => {
  const { error: sessionError } = await supabase.auth.getSession()

  if (sessionError)
    throw new Error(`An error occurred while getting session: ${sessionError.message}`)

  if (type === 'client') {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user)
      throw new Error(`An error occurred while getting user: ${userError?.message}`)

    const { data, error: selectError } = await supabase
      .from('tickets')
      .select('*')
      .eq('creator_id', user?.id)
      .limit(limit)

    if (selectError || !data)
      throw new Error(`An error occurred while getting tickets: ${selectError.message}`)

    return data
  }

  const { data, error: selectError } = await supabase.from('tickets').select('*').limit(10)

  if (selectError || !data)
    throw new Error(`An error occurred while getting tickets: ${selectError.message}`)

  return data
}

export const create = async (form: TicketFormType) => {
  const { error: sessionError } = await supabase.auth.getSession()

  if (sessionError)
    throw new Error(`An error occurred while getting session: ${sessionError.message}`)

  if (!form.title || !form.description || !form.priorityId)
    throw new Error('Missing required ticket fields: title, description, or priority')

  const data = {
    title: form.title,
    description: form.description,
    priority_id: form.priorityId
  } as TicketType

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user)
    throw new Error(`An error occurred while getting user: ${userError?.message}`)

  data.user_id = user?.id as string
  data.status_id = STATUS_BY_NAME.OPEN

  const { data: insertData, error: insertError } = await supabase.from('tickets').insert(data)

  if (insertError)
    throw new Error(`An error occurred while creating ticket: ${insertError.message}`)

  return insertData
}

export const listTicketPriorities = async () => {
  const { error: sessionError } = await supabase.auth.getSession()

  if (sessionError)
    throw new Error(`An error occurred while getting session: ${sessionError.message}`)

  const { data, error: selectError } = await supabase.from('ticket_priorities').select('*')

  if (selectError || !data)
    throw new Error(`An error occurred while getting priorities: ${selectError.message}`)

  return data
}
