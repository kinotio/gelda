import { integer, timestamp, pgTable, text, serial } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  roleId: integer('role_id').references(() => roles.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
})

export const tickets = pgTable('tickets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  reference: serial('reference'),
  title: text('title').notNull(),
  description: text('description'),
  creatorId: text('user_id').references(() => users.id),
  responsibleId: text('user_id').references(() => users.id),
  statusId: integer('status_id').references(() => status.id),
  priorityId: integer('priority_id').references(() => priorities.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()
})

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name')
})

export const status = pgTable('status', {
  id: serial('id').primaryKey(),
  name: text('name')
})

export const priorities = pgTable('priorities', {
  id: serial('id').primaryKey(),
  name: text('name')
})
