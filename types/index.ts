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
  passwordHash: string
  confirmPassword: string
  roleId: number
}

export type TTicket = {
  id: string
  title: string
  description: string
  statusId: number
  priorityId: number
  creatorId: string
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
  signOut: () => void
  message: string
  success: boolean
}
