'use server'

import { database } from '@/server/config/database'

export async function getStatus() {
  return await database.query.status.findMany()
}
