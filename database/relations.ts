import { relations } from 'drizzle-orm'

import { users, tickets, roles, status, priorities } from '@/database/schema'

export const usersRelations = relations(users, ({ one, many }) => ({
  tickets: many(tickets),
  role: one(roles, { fields: [users.roleId], references: [roles.id] })
}))

export const ticketsRelations = relations(tickets, ({ one }) => ({
  creator: one(users, { fields: [tickets.creatorId], references: [users.id] }),
  responsible: one(users, { fields: [tickets.responsibleId], references: [users.id] }),
  status: one(status, { fields: [tickets.statusId], references: [status.id] }),
  priority: one(priorities, { fields: [tickets.priorityId], references: [priorities.id] })
}))

export const rolesRelations = relations(roles, ({ many }) => ({ users: many(users) }))

export const statusRelations = relations(status, ({ many }) => ({ tickets: many(tickets) }))

export const prioritiesRelations = relations(priorities, ({ many }) => ({ tickets: many(tickets) }))
