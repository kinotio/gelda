import { database } from '@/server/config/database'

export const prioritiesMethods = {
  get: async () => {
    return await database.query.priorities.findMany()
  }
}
