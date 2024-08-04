'use server'

import { count } from 'drizzle-orm'

import { resolutions } from '@/server/config/schema'
import { database } from '@/server/config/database'

import { response } from '@/server/lib/helpers'

export const getAllResolutionsQuery = async () => {
  try {
    const data = await database.query.resolutions.findMany()
    return response(true, 'Resolutions fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching resolutions')
  }
}

export const getResolutionsCountQuery = async () => {
  try {
    const data = await database.select({ count: count() }).from(resolutions)
    return response(true, 'Resolutions count fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching resolutions count')
  }
}
