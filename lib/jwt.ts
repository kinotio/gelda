import { sign, verify } from 'jsonwebtoken'

export const signJwt = (payload: any) => sign(payload, process.env.NEXT_JWT_SECRET)

export const verifyJwt = (token: string) => verify(token, process.env.NEXT_JWT_SECRET)
