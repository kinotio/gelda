import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'

import schema from '@/database/schema'

import type { TSignUpForm, TUser, TTicket } from '@/types'

config({ path: '.env' })

const client = postgres(process.env.NEXT_DATABASE_URL)

export const db = drizzle(client, { schema })

export const usersMethods = {
  get: async () => {
    return await db.query.users.findMany()
  },
  getById: async (id: string) => {
    return await db.query.users.findFirst({
      where: eq(schema.users.id, id)
    })
  },
  getByEmail: async (email: string) => {
    return await db.query.users.findFirst({
      where: eq(schema.users.email, email)
    })
  },
  create: async (data: TSignUpForm) => {
    return await db.insert(schema.users).values(data)
  },
  update: async (data: TUser) => {
    return await db.update(schema.users).set(data).where(eq(schema.users.email, data.email))
  },
  delete: async (data: TUser) => {
    return await db.delete(schema.users).where(eq(schema.users.email, data.email))
  }
}

export const ticketsMethods = {
  get: async () => {
    return await db.query.tickets.findMany()
  },
  getById: async (id: string) => {
    return await db.query.tickets.findFirst({
      where: eq(schema.tickets.id, id)
    })
  },
  create: async (data: TTicket) => {
    return await db.insert(schema.tickets).values(data)
  },
  update: async (data: TTicket) => {
    return await db.update(schema.tickets).set(data).where(eq(schema.tickets.id, data.id))
  },
  delete: async (data: TTicket) => {
    return await db.delete(schema.tickets).where(eq(schema.tickets.id, data.id))
  }
}

export const rolesMethods = {
  get: async () => {
    return await db.query.roles.findMany()
  }
}

export const statusMethods = {
  get: async () => {
    return await db.query.status.findMany()
  }
}

export const prioritiesMethods = {
  get: async () => {
    return await db.query.priorities.findMany()
  }
}
