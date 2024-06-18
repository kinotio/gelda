'use server'

import { rolesMethods as roles } from '@/database'

export async function getRoles() {
  return await roles.get()
}
