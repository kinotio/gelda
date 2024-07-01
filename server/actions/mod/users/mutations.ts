'use server'

import { database } from '@/server/config/database'
import { response } from '@/server/lib/helpers'
import { users } from '@/server/config/schema'
import { UserInformationType } from '@/lib/definitions'

export const createUserMutation = async (user: UserInformationType) => {
  try {
    const data = await database.insert(users).values(user)
    return response(true, 'User created successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while creating a user')
  }
}
