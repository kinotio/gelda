'use server'

import { count } from 'drizzle-orm'

import { priorities } from '@/server/config/schema'
import { database } from '@/server/config/database'

import { response } from '@/server/lib/helpers'

export const getAllPrioritiesQuery = async () => {
  try {
    const data = await database.query.priorities.findMany()
    return response(true, 'Priorities fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching priorities')
  }
}

export const getPrioritiesCountQuery = async () => {
  try {
    const data = await database.select({ count: count() }).from(priorities)
    return response(true, 'Priorities count fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching priorities count')
  }
}
