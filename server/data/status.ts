import { database } from '@/server/config/database'

export const statusMethods = {
  get: async () => {
    return await database.query.status.findMany()
  }
}
