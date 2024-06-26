'use server'

import { database } from '@/server/config/database'
import { response } from '@/server/lib/response'

export async function getAll() {
  try {
    const data = await database.query.roles.findMany()
    return response(true, 'Roles fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching roles')
  }
}