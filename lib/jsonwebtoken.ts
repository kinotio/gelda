import { SignJWT, jwtVerify, JWTPayload, decodeJwt } from 'jose'

export const sign = async (payload: JWTPayload) => {
  const jwt = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt()
  // .setExpirationTime('2h') // Set expiration later
  return jwt.sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const verify = async (token: string) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
    algorithms: ['HS256']
  })
  return payload
}

export const decode = (token: string) => {
  const claims = decodeJwt(token)
  return claims
}
