import schema from '@/database/schema'

export type InsertUser = typeof schema.users.$inferInsert
export type SelectUser = typeof schema.users.$inferSelect

export type InsertTicket = typeof schema.tickets.$inferInsert
export type SelectTicket = typeof schema.tickets.$inferSelect

export type InsertRole = typeof schema.roles.$inferInsert
export type SelectRole = typeof schema.roles.$inferSelect

export type InsertStatus = typeof schema.status.$inferInsert
export type SelectStatus = typeof schema.status.$inferSelect

export type InsertPriority = typeof schema.priorities.$inferInsert
export type SelectPriority = typeof schema.priorities.$inferSelect

export type InsertResolution = typeof schema.resolutions.$inferInsert
export type SelectResolution = typeof schema.resolutions.$inferSelect
