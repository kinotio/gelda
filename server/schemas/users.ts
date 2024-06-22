import { integer, timestamp, pgTable, text } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { tickets } from '@/server/schemas/tickets'
import { roles } from '@/server/schemas/roles'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  roleId: integer('role_id').references(() => roles.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
})

export const usersRelations = relations(users, ({ one, many }) => ({
  createdTickets: many(tickets),
  responsibleOfTickets: many(tickets),
  role: one(roles, { fields: [users.roleId], references: [roles.id] })
}))

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect
