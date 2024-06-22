import { pgTable, text, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { tickets } from '@/database/schemas/tickets'

export const resolutions = pgTable('resolutions', {
  id: serial('id').primaryKey(),
  name: text('name')
})

export const resolutionsRelations = relations(resolutions, ({ many }) => ({
  tickets: many(tickets)
}))

export type InsertResolution = typeof resolutions.$inferInsert
export type SelectResolution = typeof resolutions.$inferSelect
