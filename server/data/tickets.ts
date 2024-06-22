import { eq } from 'drizzle-orm'

import schema from '@/server/schema'
import { database } from '@/server/config/database'
import { TicketInformationType } from '@/lib/definitions'

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
  create: async (data: TicketInformationType) => {
    return await database.insert(schema.tickets).values(data)
  },
  update: async (data: TicketInformationType) => {
    return await database.update(schema.tickets).set(data).where(eq(schema.tickets.id, data.id))
  },
  delete: async (id: string) => {
    return await database.delete(schema.tickets).where(eq(schema.tickets.id, id))
  }
}
