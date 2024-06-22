import { database } from '@/server/config/database'

export const rolesMethods = {
  get: async () => {
    return await database.query.roles.findMany()
  }
}
