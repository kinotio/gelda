import { SignJWT, jwtVerify, JWTPayload } from 'jose'

export const signJwt = async (payload: JWTPayload) => {
  const jwt = new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt()
  // .setExpirationTime('2h') // Set expiration later
  return jwt.sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const verifyJwt = async (token: string) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
    algorithms: ['HS256']
  })
  return payload
}
