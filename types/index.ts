export type TUser = {
  id: string
  name: string
  email: string
  roleId?: number
}

export type TSignInForm = {
  email: string
  password: string
}

export type TSignUpForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
  roleId: number
}

export type TTicket = {
  id: string
  reference?: number
  title: string
  description: string
  status: number
  priority: number
  userId: number
}

export type TCommonEntity = {
  id: number
  name: string
}

export type TStatus = TCommonEntity
export type TPriority = TCommonEntity
export type TRole = TCommonEntity

export type TCookieOptions = {
  days?: number
  path?: string
  domain?: string
  SameSite?: 'None' | 'Lax' | 'Strict'
  Secure?: boolean
  HttpOnly?: boolean
}

export type TUseAuthResult = {
  loading: boolean
  signIn: (form: TSignInForm) => Promise<void>
  message: string
  success: boolean
}
