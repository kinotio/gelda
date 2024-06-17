'use server'

import { cookies } from 'next/headers'

import { hash, compare } from '@/lib/bcrypt'
import { signJwt } from '@/lib/jwt'

import { getUserByEmail, createUser } from '@/database'

import { signinSchema, signupSchema } from '@/utils/validators'
import { PG_UNIQUE_VIOLATION_ERROR_CODE, ROLE_BY_NAME } from '@/utils/constants'

import type { TSignInForm, TSignUpForm } from '@/types'

import { TOKEN_NAME } from '@/utils/constants'

export async function signin(form: TSignInForm) {
  const { success, data } = signinSchema.safeParse(form)
  if (!success) {
    return {
      success: false,
      message:
        'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    }
  }

  try {
    const user = await getUserByEmail(data.email)

    if (!user) {
      return {
        success: false,
        message: 'Sign in failed: The email provided is not linked with an account.'
      }
    }

    const isPasswordValid = await compare(data.password, user.password)

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Sign in failed: The password provided is incorrect.'
      }
    }

    const token = await signJwt({ user_id: user.id, role_id: user.roleId })

    cookies().set(TOKEN_NAME, token)

    return {
      success: true,
      message: 'Sign in successful: You are now signed in.'
    }
  } catch (error) {
    return {
      success: false,
      message:
        'Sign in failed: An error occurred while processing your request. Please try again later.'
    }
  }
}

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
    const hashedPassword = await hash(data.password)
    const userData = {
      ...data,
      password: hashedPassword,
      roleId: ROLE_BY_NAME.CLIENT
    }

    await createUser(userData)

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

export async function signout() {
  cookies().delete(TOKEN_NAME)

  return {
    success: true,
    message: 'Sign out successful: You are now signed out.'
  }
}
