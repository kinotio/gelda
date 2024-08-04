'use server'

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
