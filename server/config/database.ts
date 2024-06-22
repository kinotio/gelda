import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import schema from '@/server/schema'

config({ path: '.env' })

const client = postgres(process.env.NEXT_DATABASE_URL)

export const database = drizzle(client, { schema })
