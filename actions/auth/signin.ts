'use server'

import { hash, compare } from '@/lib/bcrypt'
import { signJwt } from '@/lib/jwt'

import { usersMethods as users } from '@/database'

import { signinSchema } from '@/utils/validators'

import type { TSignInForm } from '@/types'

import { response } from '@/utils/response'

export async function signin(form: TSignInForm) {
  const { success, data } = signinSchema.safeParse(form)
  if (!success) {
    return response(
      false,
      'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    )
  }

  try {
    const user = await users.getByEmail(data.email)

    if (!user) {
      return response(false, 'Sign in failed: The email provided is not linked with an account.')
    }

    const isPasswordValid = await compare(data.password, user.passwordHash)

    if (!isPasswordValid) {
      return response(false, 'Sign in failed: The password provided is incorrect.')
    }

    const token = await signJwt({ user_id: user.id, role_id: user.roleId })

    return response(true, 'Sign in successful: You are now signed in.', token)
  } catch (error) {
    return response(
      false,
      'Sign in failed: An error occurred while processing your request. Please try again later.'
    )
  }
}
