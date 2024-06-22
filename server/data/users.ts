import { eq } from 'drizzle-orm'

import schema from '@/server/schema'
import { database } from '@/server/config/database'
import { UserInformationType } from '@/lib/definitions'

export const usersMethods = {
  get: async () => {
    return await database.query.users.findMany({
      where: eq(schema.users.roleId, 1)
    })
  },
  getById: async (id: string) => {
    return await database.query.users.findFirst({
      where: eq(schema.users.id, id)
    })
  },
  getByEmail: async (email: string) => {
    return await database.query.users.findFirst({
      where: eq(schema.users.email, email)
    })
  },
  create: async (data: UserInformationType) => {
    return await database.insert(schema.users).values(data)
  },
  update: async (data: UserInformationType) => {
    return await database.update(schema.users).set(data).where(eq(schema.users.email, data.email))
  },
  delete: async (id: string) => {
    return await database.delete(schema.users).where(eq(schema.users.id, id))
  }
}
