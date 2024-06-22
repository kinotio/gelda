import { pgTable, text, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { tickets } from '@/server/schemas/tickets'

export const status = pgTable('status', {
  id: serial('id').primaryKey(),
  name: text('name')
})

export const statusRelations = relations(status, ({ many }) => ({
  tickets: many(tickets)
}))

export type InsertStatus = typeof status.$inferInsert
export type SelectStatus = typeof status.$inferSelect
