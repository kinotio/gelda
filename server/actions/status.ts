'use server'

import { statusMethods as status } from '@/server/data/status'

export async function getStatus() {
  return await status.get()
}
