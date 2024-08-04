'use server'

import { count } from 'drizzle-orm'

import { statuses } from '@/server/config/schema'
import { database } from '@/server/config/database'

import { response } from '@/server/lib/helpers'

export const getAllStatusesQuery = async () => {
  try {
    const data = await database.query.statuses.findMany()
    return response(true, 'Statuses fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching statuses')
  }
}

export const getStatusesCountQuery = async () => {
  try {
    const data = await database.select({ count: count() }).from(statuses)
    return response(true, 'Statuses count fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching statuses count')
  }
}
