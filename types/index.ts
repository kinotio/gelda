export type TUser = {
  name: string
  email: string
  role?: string
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
  role?: string
}
