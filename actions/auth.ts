'use server'

import { cookies } from 'next/headers'

import { db, eq } from '@/lib/drizzle'
import { hash, compare } from '@/lib/bcrypt'
import { signJwt } from '@/lib/jwt'

import { usersTable } from '@/database/schema'

import { signinSchema, signupSchema } from '@/utils/validators'
import { PG_UNIQUE_VIOLATION_ERROR_CODE } from '@/utils/constants'

import type { TSignInForm, TSignUpForm } from '@/types'

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
    const users = await db.select().from(usersTable).where(eq(usersTable.email, data.email))
    const user = users[0]

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

    cookies().set('__token', signJwt({ user_id: user.id, is_logged: true }))

    return {
      success: true,
      message: 'Sign in successful: You are now signed in.'
    }
  } catch (error) {
    cookies().delete('__token')

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
