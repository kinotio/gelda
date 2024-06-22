'use server'

import { eq } from 'drizzle-orm'

import { database } from '@/server/config/database'
import { response } from '@/server/lib/response'
import schema from '@/server/schema'
import { ROLE_BY_NAME } from '@/lib/constants'

export async function getAllUsers() {
  try {
    const data = await database.query.users.findMany({
      where: eq(schema.users.roleId, ROLE_BY_NAME.CLIENT)
    })
    return response(true, '', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching users')
  }
}
