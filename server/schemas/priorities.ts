import { pgTable, text, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { tickets } from '@/server/schemas/tickets'

export const priorities = pgTable('priorities', {
  id: serial('id').primaryKey(),
  name: text('name')
})

export const prioritiesRelations = relations(priorities, ({ many }) => ({
  tickets: many(tickets)
}))

export type InsertPriority = typeof priorities.$inferInsert
export type SelectPriority = typeof priorities.$inferSelect
