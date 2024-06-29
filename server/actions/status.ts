'use server'

import { database } from '@/server/config/database'
import { response } from '@/server/lib/helpers'

export const getAll = async () => {
  try {
    const data = await database.query.statuses.findMany()
    return response(true, 'Statuses fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching statuses')
  }
}
