import { users, usersRelations } from '@/server/schema/users'
import { tickets, ticketsRelations } from '@/server/schema/tickets'
import { roles, rolesRelations } from '@/server/schema/roles'
import { priorities, prioritiesRelations } from '@/server/schema/priorities'
import { resolutions, resolutionsRelations } from '@/server/schema/resolutions'
import { status, statusRelations } from '@/server/schema/status'

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
