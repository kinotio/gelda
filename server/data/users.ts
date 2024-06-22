import { eq } from 'drizzle-orm'

import type { TSignUpForm, TUser } from '@/types/main'
import schema from '@/server/schemas'
import { database } from '@/server/config/database'

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
  create: async (data: TSignUpForm) => {
    return await database.insert(schema.users).values(data)
  },
  update: async (data: TUser) => {
    return await database.update(schema.users).set(data).where(eq(schema.users.email, data.email))
  },
  delete: async (data: TUser) => {
    return await database.delete(schema.users).where(eq(schema.users.email, data.email))
  }
}
