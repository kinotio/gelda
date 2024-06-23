import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

if (!process.env.SUPABASE_DATABASE_URL) throw new Error('SUPABASE_DATABASE_URL is missing')

export default defineConfig({
  schema: './server/config/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.SUPABASE_DATABASE_URL }
})
