'use server'

import { prioritiesMethods as priorities } from '@/server/data/priorities'

export async function getPriorities() {
  return await priorities.get()
}
