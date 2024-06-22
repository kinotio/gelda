'use server'

import { database } from '@/server/config/database'

export async function getRoles() {
  return await database.query.roles.findMany()
}
