import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'

import { users, tickets, status, priorities, roles } from '@/database/schema'

import type { TSignUpForm, TUser } from '@/types'

config({ path: '.env' })

const client = postgres(process.env.NEXT_DATABASE_URL)

export const db = drizzle(client, {
  schema: {
    users,
    tickets,
    status,
    priorities,
    roles
  }
})

export const getUsers = async () => {
  return await db.query.users.findMany()
}

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id)
  })
}

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email)
  })
}

export const createUser = async (data: TSignUpForm) => {
  return await db.insert(users).values(data)
}

export const updateUser = async (data: TUser) => {
  return await db.update(users).set(data).where(eq(users.email, data.email))
}

export const deleteUser = async (data: TUser) => {
  return await db.delete(users).where(eq(users.email, data.email))
}

export const getTickets = async () => {
  return await db.query.tickets.findMany()
}

export const getTicketById = async (id: string) => {
  return await db.query.tickets.findFirst({
    where: eq(tickets.id, id)
  })
}
