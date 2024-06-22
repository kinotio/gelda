import { users, usersRelations } from '@/database/schemas/users'
import { tickets, ticketsRelations } from '@/database/schemas/tickets'
import { roles, rolesRelations } from '@/database/schemas/roles'
import { priorities, prioritiesRelations } from '@/database/schemas/priorities'
import { resolutions, resolutionsRelations } from '@/database/schemas/resolutions'
import { status, statusRelations } from '@/database/schemas/status'

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
