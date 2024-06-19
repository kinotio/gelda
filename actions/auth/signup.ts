'use server'

import { hash } from '@/lib/bcrypt'

import { usersMethods as users } from '@/database'

import { signupSchema } from '@/utils/validators'
import { PG_UNIQUE_VIOLATION_ERROR_CODE, ROLE_BY_NAME } from '@/utils/constants'

import type { TSignUpForm } from '@/types'

import { response } from '@/utils/response'

export async function signup(form: TSignUpForm) {
  const { success, data } = signupSchema.safeParse(form)
  if (!success) {
    return response(
      false,
      'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    )
  }

  try {
    const hashedPassword = await hash(data.password)
    const userData = {
      ...data,
      passwordHash: hashedPassword,
      roleId: ROLE_BY_NAME.CLIENT
    }

    await users.create(userData)

    return response(true, 'Registration successful: Your account has been created.')
  } catch (error) {
    const typedError = error as { code: string }

    if (parseInt(typedError.code) === PG_UNIQUE_VIOLATION_ERROR_CODE) {
      return response(
        false,
        'Registration failed: The email provided is already linked with an account.'
      )
    }

    return response(
      false,
      'Registration failed: An error occurred while processing your request. Please try again later.'
    )
  }
}
