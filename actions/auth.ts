'use server'

import { db } from '@/lib/drizzle'
import { hash } from '@/lib/bcrypt'

import { usersTable } from '@/database/schema'

import { signupSchema } from '@/utils/validators'
import { PG_UNIQUE_VIOLATION_ERROR_CODE } from '@/utils/constants'

import type { TSignUpForm } from '@/types'

export async function sigin() {}

export async function signup(form: TSignUpForm) {
  const { success, data } = signupSchema.safeParse(form)
  if (!success) {
    return {
      success: false,
      message:
        'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    }
  }

  try {
    const hashedPassword = await hash(data.password, 10)
    const userData = {
      ...data,
      password: hashedPassword
    }

    await db.insert(usersTable).values(userData)

    return {
      success: true,
      message: 'Registration successful: Your account has been created.'
    }
  } catch (error) {
    const typedError = error as { code: string }

    if (parseInt(typedError.code) === PG_UNIQUE_VIOLATION_ERROR_CODE) {
      return {
        success: false,
        message: 'Registration failed: The email provided is already linked with an account.'
      }
    }

    return {
      success: false,
      message:
        'Registration failed: An error occurred while processing your request. Please try again later.'
    }
  }
}
