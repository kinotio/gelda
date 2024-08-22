export type LoginFormType = {
  email: string
  password: string
}

export type RegisterFormType = {
  name: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type TicketFormType = {
  title: string
  description: string
  priorityId: number
}

export type TicketType = {
  id: number
  title: string
  slug: string
  description: string
  priority_id: number
  status_id: number
  creator_id: string
  created_at: Date
}

export type TicketPriorityType = {
  id: number
  name: string
  slug: string
}

export type UserType = {
  id: string
  email: string
  name: string
  username: string
  status: string
  created_at: string
}

export type UpdateProfileInformationFormType = {
  name: string
  username: string
  email: string
}
