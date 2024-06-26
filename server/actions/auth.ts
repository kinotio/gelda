'use server'

import { eq } from 'drizzle-orm'

import { hash, compare } from '@/server/lib/bcrypt'
import { sign } from '@/lib/jsonwebtoken'
import { signinFormSchemaValidator, signupFormSchemaValidator } from '@/server/lib/validators'
import { PG_UNIQUE_VIOLATION_ERROR_CODE, ROLE_BY_NAME } from '@/lib/constants'
import { response } from '@/server/lib/response'
import { AuthSignInFormType, AuthSignUpFormType, UserInformationType } from '@/lib/definitions'
import { database } from '@/server/config/database'
import { users, sessionTokens } from '@/server/config/schema'

export async function signin(form: AuthSignInFormType) {
  const { success, data } = signinFormSchemaValidator.safeParse(form)
  if (!success) {
    return response(
      false,
      'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    )
  }

  try {
    const user = await database.query.users.findFirst({
      where: eq(users.email, data.email)
    })

    if (!user) {
      return response(false, 'Sign in failed: The email provided is not linked with an account.')
    }

    const isPasswordValid = await compare(data.password, user.hashedPassword)

    if (!isPasswordValid) {
      return response(false, 'Sign in failed: The password provided is incorrect.')
    }

    await database.update(users).set({ lastLogin: new Date() }).where(eq(users.id, user.id))

    const token = await sign({ user_id: user.id, role_id: user.roleId })

    await database.insert(sessionTokens).values({ token, userId: user.id })

    return response(true, 'Sign in successful: You are now signed in.', token)
  } catch (error) {
    return response(
      false,
      'Sign in failed: An error occurred while processing your request. Please try again later.'
    )
  }
}

export async function signup(form: AuthSignUpFormType) {
  const { success, data } = signupFormSchemaValidator.safeParse(form)
  if (!success) {
    return response(
      false,
      'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    )
  }

  try {
    const hashedPassword = await hash(data.password)
    const user: UserInformationType = {
      name: data.name,
      email: data.email,
      hashedPassword,
      roleId: ROLE_BY_NAME.CLIENT
    } as UserInformationType

    await database.insert(users).values(user)

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
