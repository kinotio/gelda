import { integer, timestamp, pgTable, text, serial, uuid, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Schema
const user = {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
  roleId: integer('role_id')
    .references(() => roles.id)
    .notNull(),
  lastLogin: timestamp('last_login', { mode: 'date' }),
  emailVerifiedAt: timestamp('email_verified_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

const ticket = {
  id: uuid('id').primaryKey().defaultRandom(),
  reference: serial('reference').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  creatorId: uuid('creator_id')
    .references(() => users.id)
    .notNull(),
  statusId: integer('status_id')
    .references(() => statuses.id)
    .notNull(),
  priorityId: integer('priority_id')
    .references(() => priorities.id)
    .notNull(),
  responsibleId: uuid('responsible_id').references(() => users.id),
  resolutionId: integer('resolution_id').references(() => resolutions.id),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

const role = {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

const status = {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

const resolution = {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

const priority = {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

const sessionToken = {
  id: serial('id').primaryKey(),
  token: text('token').notNull(),
  tokenVersion: integer('token_version').default(0),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
}

const aiConfiguration = {
  id: serial('id').primaryKey(),
  provider: text('provider').notNull(),
  model: text('model').notNull(),
  aiKeyId: integer('ai_key_id')
    .references(() => aiKeys.id)
    .notNull(),
  creatorId: uuid('creator_id')
    .references(() => users.id)
    .notNull(),
  global: boolean('global').default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

const aiKey = {
  id: serial('id').primaryKey(),
  hashedKey: text('hashed_key').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
}

// Table
export const users = pgTable('users', user)
export const tickets = pgTable('tickets', ticket)
export const roles = pgTable('roles', role)
export const statuses = pgTable('statuses', status)
export const resolutions = pgTable('resolutions', resolution)
export const priorities = pgTable('priorities', priority)
export const sessionTokens = pgTable('session_tokens', sessionToken)
export const aiConfigurations = pgTable('ai_configurations', aiConfiguration)
export const aiKeys = pgTable('ai_keys', aiKey)

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  createdTickets: many(tickets),
  responsibleOfTickets: many(tickets),
  role: one(roles, { fields: [users.roleId], references: [roles.id] }),
  sessionTokens: many(sessionTokens),
  aiConfiguration: one(aiConfigurations)
}))

export const ticketsRelations = relations(tickets, ({ one }) => ({
  creator: one(users, { fields: [tickets.creatorId], references: [users.id] }),
  responsible: one(users, {
    fields: [tickets.responsibleId],
    references: [users.id]
  }),
  status: one(statuses, { fields: [tickets.statusId], references: [statuses.id] }),
  priority: one(priorities, {
    fields: [tickets.priorityId],
    references: [priorities.id]
  }),
  resolution: one(resolutions, {
    fields: [tickets.resolutionId],
    references: [resolutions.id]
  })
}))

export const rolesRelations = relations(roles, ({ many }) => ({ users: many(users) }))

export const statusesRelations = relations(statuses, ({ many }) => ({ tickets: many(tickets) }))

export const resolutionsRelations = relations(resolutions, ({ many }) => ({
  tickets: many(tickets)
}))

export const prioritiesRelations = relations(priorities, ({ many }) => ({ tickets: many(tickets) }))

export const sessionTokensRelations = relations(sessionTokens, ({ one }) => ({
  user: one(users, { fields: [sessionTokens.userId], references: [users.id] })
}))

export const aiConfigurationsRelations = relations(aiConfigurations, ({ one }) => ({
  creator: one(users, {
    fields: [aiConfigurations.creatorId],
    references: [users.id]
  }),
  key: one(aiKeys, {
    fields: [aiConfigurations.aiKeyId],
    references: [aiKeys.id]
  })
}))

// Types
export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertTicket = typeof tickets.$inferInsert
export type SelectTicket = typeof tickets.$inferSelect

export type InsertRole = typeof roles.$inferInsert
export type SelectRole = typeof roles.$inferSelect

export type InsertStatus = typeof statuses.$inferInsert
export type SelectStatus = typeof statuses.$inferSelect

export type InsertResolution = typeof resolutions.$inferInsert
export type SelectResolution = typeof resolutions.$inferSelect

export type InsertPriority = typeof priorities.$inferInsert
export type SelectPriority = typeof priorities.$inferSelect

export type InsertSessionToken = typeof sessionTokens.$inferInsert
export type SelectSessionToken = typeof sessionTokens.$inferSelect

export type InsertAiConfiguration = typeof aiConfigurations.$inferInsert
export type SelectAiConfiguration = typeof aiConfigurations.$inferSelect

export type InsertAiKey = typeof aiKeys.$inferInsert
export type SelectAiKey = typeof aiKeys.$inferSelect
