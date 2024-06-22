import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schema: './server/schema',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.NEXT_DATABASE_URL }
})
