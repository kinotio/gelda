import { eq } from 'drizzle-orm'

import type { TTicket } from '@/types/main'
import schema from '@/server/schemas'
import { database } from '@/server/config/database'

export const ticketsMethods = {
  get: async () => {
    return await database.query.tickets.findMany({
      with: {
        status: true,
        priority: true,
        resolution: true,
        creator: true
      }
    })
  },
  getById: async (id: string) => {
    return await database.query.tickets.findFirst({
      where: eq(schema.tickets.id, id)
    })
  },
  create: async (data: TTicket) => {
    return await database.insert(schema.tickets).values(data)
  },
  update: async (data: TTicket) => {
    return await database.update(schema.tickets).set(data).where(eq(schema.tickets.id, data.id))
  },
  delete: async (data: TTicket) => {
    return await database.delete(schema.tickets).where(eq(schema.tickets.id, data.id))
  }
}
