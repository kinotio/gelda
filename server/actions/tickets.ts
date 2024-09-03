'use server'

import { supabase } from '@/lib/supabase/server'

import { TicketFormType, TicketType } from '@/lib/definitions'
import { STATUS_BY_NAME, METRICS, RESOLUTION_BY_NAME } from '@/lib/constants'
import { sluggify } from '@/lib/utils'

import { getUser } from '@/server/actions/auth'
import { save } from '@/server/actions/activities'

const DEFAULT_TYPE = 'client'

type MetricType = {
  type: string
  name: string
  description: string
  count: number
}

type Metric = Record<
  string,
  { status_id: number; priority_id: number; resolution_id: number | null; count: number }
>

export const listAll = async () => {
  await getUser()

  const query = '*'

  const {
    data,
    error: selectError,
    count
  } = await supabase.from('tickets').select(query, { count: 'exact' })

  if (selectError)
    throw new Error(`An error occurred while getting tickets: ${selectError.message}`)

  return { data, count }
}

export const list = async ({
  type = DEFAULT_TYPE,
  currentPage = 1,
  perPage = 7
}: {
  type?: 'client' | 'admin'
  currentPage?: number
  perPage?: number
}) => {
  await getUser()

  const query =
    '*, ticket_statuses (name, slug), ticket_resolutions (name, slug), ticket_priorities (name, slug)'

  if (type === 'client') {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user)
      throw new Error(`An error occurred while getting user: ${userError?.message}`)

    const {
      data,
      error: selectError,
      count
    } = await supabase
      .from('tickets')
      .select(query, { count: 'exact' })
      .eq('creator_id', user?.id)
      .order('created_at', { ascending: false })
      .range((currentPage - 1) * perPage, currentPage * perPage - 1)

    if (selectError || !data)
      throw new Error(`An error occurred while getting tickets: ${selectError.message}`)

    return { data, count }
  }

  const {
    data,
    error: selectError,
    count
  } = await supabase
    .from('tickets')
    .select(query, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((currentPage - 1) * perPage, currentPage * perPage - 1)

  if (selectError || !data)
    throw new Error(`An error occurred while getting tickets: ${selectError.message}`)

  return { data, count }
}

export const create = async (form: TicketFormType) => {
  const user = await getUser()

  if (!form.title || !form.description || !form.priorityId)
    throw new Error('Missing required ticket fields: title, description, or priority')

  const data = {
    title: form.title,
    description: form.description,
    priority_id: form.priorityId
  } as TicketType

  data.slug = sluggify(form.title)
  data.creator_id = user?.id as string
  data.status_id = STATUS_BY_NAME.OPEN
  data.resolution_id = RESOLUTION_BY_NAME.UNKNOWN

  const { data: insertData, error: insertError } = await supabase.from('tickets').insert(data)

  if (insertError)
    throw new Error(`An error occurred while creating ticket: ${insertError.message}`)

  await save({
    type: 'ticket_created',
    description: 'New ticket created'
  })

  return insertData
}

export const getTicketById = async (id: number) => {
  await getUser()

  const query =
    '*, ticket_statuses (name, slug), ticket_resolutions (name, slug), ticket_priorities (name, slug)'

  const { data, error } = await supabase.from('tickets').select(query).eq('id', id).limit(1)

  if (error) throw new Error(`An error occurred while getting ticke: ${error.message}`)

  return data
}

export const listTicketStatuses = async () => {
  await getUser()

  const { data, error: selectError } = await supabase.from('ticket_statuses').select('*')

  if (selectError || !data)
    throw new Error(`An error occurred while getting statuses: ${selectError.message}`)

  return data
}

export const listTicketPriorities = async () => {
  await getUser()

  const { data, error: selectError } = await supabase.from('ticket_priorities').select('*')

  if (selectError || !data)
    throw new Error(`An error occurred while getting priorities: ${selectError.message}`)

  return data
}

export const listTicketResolutions = async () => {
  await getUser()

  const { data, error: selectError } = await supabase.from('ticket_resolutions').select('*')

  if (selectError || !data)
    throw new Error(`An error occurred while getting resolutions: ${selectError.message}`)

  return data
}

export const metrics = async ({ type = DEFAULT_TYPE }: { type?: 'client' | 'admin' }) => {
  let results: any[] = []

  const user = await getUser()

  if (type === 'client') {
    const { data, error: selectError } = await supabase
      .from('tickets')
      .select()
      .eq('creator_id', user.id)

    if (selectError)
      throw new Error(`An error occurred while getting ticket metrics: ${selectError.message}`)

    results = data
  } else {
    const { data, error: selectError } = await supabase.from('tickets').select()

    if (selectError)
      throw new Error(`An error occurred while getting ticket metrics: ${selectError.message}`)

    results = data
  }

  const groupedData = results.reduce((acc, item) => {
    const key = `${item.status_id}-${item.priority_id}-${item.resolution_id}`
    if (!acc[key]) {
      acc[key] = {
        status_id: item.status_id,
        priority_id: item.priority_id,
        resolution_id: item.resolution_id,
        count: 0
      }
    }
    acc[key].count += 1
    return acc
  }, {} as Metric)

  const parsed = Object.values(groupedData)

  const metricsMap: Record<string, MetricType> = METRICS.reduce((acc: any, metric) => {
    acc[`${metric.type}-${metric.name}`] = metric
    return acc
  }, {})

  parsed.forEach(({ status_id, priority_id, resolution_id, count }: any) => {
    if (status_id !== null) {
      if (status_id === 1) metricsMap['status-open'].count = count
      if (status_id === 2) metricsMap['status-closed'].count = count
      if (status_id === 3) metricsMap['status-inProgress'].count = count
    }

    if (priority_id !== null) {
      if (priority_id === 1) metricsMap['priority-low'].count = count
      if (priority_id === 2) metricsMap['priority-medium'].count = count
      if (priority_id === 3) metricsMap['priority-high'].count = count
    }

    if (resolution_id !== null) {
      if (resolution_id === 1) metricsMap['resolution-resolved'].count = count
      if (resolution_id === 2) metricsMap['resolution-unresolved'].count = count
    }
  })

  const data: MetricType[] = Object.values(metricsMap)

  return data
}
