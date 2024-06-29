import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '@/server/config/schema'

config({ path: '.env' })

if (!process.env.SUPABASE_DATABASE_URL)
  throw new Error('An error occurred SUPABASE_DATABASE_URL not found in .env file')

const client = postgres(process.env.SUPABASE_DATABASE_URL)

export const database = drizzle(client, { schema })
