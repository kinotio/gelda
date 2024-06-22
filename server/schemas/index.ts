import { users, usersRelations } from '@/server/schemas/users'
import { tickets, ticketsRelations } from '@/server/schemas/tickets'
import { roles, rolesRelations } from '@/server/schemas/roles'
import { priorities, prioritiesRelations } from '@/server/schemas/priorities'
import { resolutions, resolutionsRelations } from '@/server/schemas/resolutions'
import { status, statusRelations } from '@/server/schemas/status'

const schema = {
  users,
  tickets,
  roles,
  status,
  priorities,
  resolutions,
  usersRelations,
  ticketsRelations,
  rolesRelations,
  prioritiesRelations,
  resolutionsRelations,
  statusRelations
}

export default schema
