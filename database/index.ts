import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'

import { users } from '@/database/schema'

import type { TSignUpForm, TUser } from '@/types'

config({ path: '.env' })

const client = postgres(process.env.NEXT_DATABASE_URL)

export const db = drizzle(client)

export const getUserById = async (id: string) => {
  return await db.select().from(users).where(eq(users.id, id))
}

export const getUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email))
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
