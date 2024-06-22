'use server'

import { database } from '@/server/config/database'

export async function getPriorities() {
  return await database.query.priorities.findMany()
}
