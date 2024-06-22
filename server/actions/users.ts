'use server'

import { usersMethods as users } from '@/server/data/users'
import { response } from '@/server/lib/response'

export async function getAllUsers() {
  try {
    const data = await users.get()
    return response(true, '', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching users')
  }
}
