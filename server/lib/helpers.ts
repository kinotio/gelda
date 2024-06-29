import { sign } from 'jsonwebtoken'

import { UserInformationType, SessionTokenType } from '@/lib/definitions'

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
