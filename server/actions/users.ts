'use server'

import { eq } from 'drizzle-orm'

import { database } from '@/server/config/database'
import { response } from '@/server/lib/helpers'
import { users } from '@/server/config/schema'
import { ROLE_BY_NAME } from '@/lib/constants'
import { UserInformationType } from '@/lib/definitions'

export async function getAll() {
  try {
    const data = await database.query.users.findMany({
      where: eq(users.roleId, ROLE_BY_NAME.CLIENT)
    })
    return response(true, '', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching users')
  }
}

export async function getById(id: string) {
  try {
    const data = await database.query.users.findFirst({
      where: eq(users.id, id)
    })
    return response(true, 'User fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching a user')
  }
}

export async function create(user: UserInformationType) {
  try {
    const data = await database.insert(users).values(user)
    return response(true, 'User created successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while creating a user')
  }
}
