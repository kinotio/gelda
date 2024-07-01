import { sign } from 'jsonwebtoken'

import { UserInformationType, SessionTokenType } from '@/lib/definitions'

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
  throw new Error(
    'An error occurred ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined in .env file'
  )

export const response = (success: boolean, message: string, data?: any) => {
  return { success, message, data }
}

export const createAccessToken = (user: UserInformationType) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const createRefreshToken = (user: UserInformationType, sessionToken: SessionTokenType) => {
  return sign(
    { userId: user.id, tokenVersion: sessionToken.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d'
    }
  )
}

export const sendRefreshToken = (cookie: any, token: string) => {
  cookie('refreshToken', token, {
    httpOnly: true
  })
}
