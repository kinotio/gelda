import { relations } from 'drizzle-orm'

import schema from '@/database/schema'

export const usersRelations = relations(schema.users, ({ one, many }) => ({
  createdTickets: many(schema.tickets),
  responsibleOfTickets: many(schema.tickets),
  role: one(schema.roles, { fields: [schema.users.roleId], references: [schema.roles.id] })
}))

export const ticketsRelations = relations(schema.tickets, ({ one }) => ({
  creator: one(schema.users, { fields: [schema.tickets.creatorId], references: [schema.users.id] }),
  responsible: one(schema.users, {
    fields: [schema.tickets.responsibleId],
    references: [schema.users.id]
  }),
  status: one(schema.status, { fields: [schema.tickets.statusId], references: [schema.status.id] }),
  priority: one(schema.priorities, {
    fields: [schema.tickets.priorityId],
    references: [schema.priorities.id]
  }),
  resolution: one(schema.resolutions, {
    fields: [schema.tickets.resolutionId],
    references: [schema.resolutions.id]
  })
}))

export const rolesRelations = relations(schema.roles, ({ many }) => ({ users: many(schema.users) }))

export const statusRelations = relations(schema.status, ({ many }) => ({
  tickets: many(schema.tickets)
}))

export const prioritiesRelations = relations(schema.priorities, ({ many }) => ({
  tickets: many(schema.tickets)
}))

export const resolutionsRelations = relations(schema.resolutions, ({ many }) => ({
  tickets: many(schema.tickets)
}))
