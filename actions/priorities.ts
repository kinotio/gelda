'use server'

import { prioritiesMethods as priorities } from '@/database'

export async function getPriorities() {
  return await priorities.get()
}
