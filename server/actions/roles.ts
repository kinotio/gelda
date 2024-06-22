'use server'

import { rolesMethods as roles } from '@/server/data/roles'

export async function getRoles() {
  return await roles.get()
}
