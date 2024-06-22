import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schema: './server/schemas/index.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.NEXT_DATABASE_URL }
})
