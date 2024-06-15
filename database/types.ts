import { users, tickets, roles, status, priorities } from '@/database/schema'

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InsertTicket = typeof tickets.$inferInsert
export type SelectTicket = typeof tickets.$inferSelect

export type InsertRole = typeof roles.$inferInsert
export type SelectRole = typeof roles.$inferSelect

export type InsertStatus = typeof status.$inferInsert
export type SelectStatus = typeof status.$inferSelect

export type InsertPriority = typeof priorities.$inferInsert
export type SelectPriority = typeof priorities.$inferSelect
