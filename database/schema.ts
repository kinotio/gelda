import { timestamp, pgTable, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('client'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect
