import { SignJWT, jwtVerify, JWTPayload, decodeJwt } from 'jose'

export const sign = async (payload: JWTPayload) => {
  const jwt = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt()
  return jwt.sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET))
}

export const verify = async (token: string) => {
  if (!token) return null
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET),
    {
      algorithms: ['HS256']
    }
  )
  return payload
}

export const decode = (token: string) => {
  if (!token) return null
  const claims = decodeJwt(token)
  return claims
}
