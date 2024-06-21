'use server'

import { hash, compare } from '@/lib/bcrypt'
import { signJwt } from '@/lib/jwt'

import { usersMethods as users } from '@/database'

import { signinSchema, signupSchema } from '@/utils/validators'
import { PG_UNIQUE_VIOLATION_ERROR_CODE, ROLE_BY_NAME } from '@/utils/constants'

import type { TSignInForm, TSignUpForm } from '@/types'

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

export async function signout() {
  return response(true, 'Sign out successful: You are now signed out.')
}
