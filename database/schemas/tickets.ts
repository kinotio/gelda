import { integer, timestamp, pgTable, text, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from '@/database/schemas/users'
import { status } from '@/database/schemas/status'
import { resolutions } from '@/database/schemas/resolutions'
import { priorities } from '@/database/schemas/priorities'

export const tickets = pgTable('tickets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  reference: serial('reference').unique(),
  title: text('title').notNull(),
  description: text('description'),
  creatorId: text('user_id')
    .references(() => users.id)
    .notNull(),
  statusId: integer('status_id')
    .references(() => status.id)
    .notNull(),
  priorityId: integer('priority_id')
    .references(() => priorities.id)
    .notNull(),
  responsibleId: text('user_id').references(() => users.id),
  resolutionId: integer('resolution_id').references(() => resolutions.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
})

export type InsertTicket = typeof tickets.$inferInsert
export type SelectTicket = typeof tickets.$inferSelect

export const ticketsRelations = relations(tickets, ({ one }) => ({
  creator: one(users, { fields: [tickets.creatorId], references: [users.id] }),
  responsible: one(users, {
    fields: [tickets.responsibleId],
    references: [users.id]
  }),
  status: one(status, { fields: [tickets.statusId], references: [status.id] }),
  priority: one(priorities, {
    fields: [tickets.priorityId],
    references: [priorities.id]
  }),
  resolution: one(resolutions, {
    fields: [tickets.resolutionId],
    references: [resolutions.id]
  })
}))
