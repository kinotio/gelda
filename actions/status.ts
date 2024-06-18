'use server'

import { statusMethods as status } from '@/database'

export async function getStatus() {
  return await status.get()
}
