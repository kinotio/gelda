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

type TicketCommonType = {
  name: string
  slug: string
}

export type TicketType = {
  id: number
  title: string
  description: string
  slug: string

  created_at: string

  priority_id: number
  creator_id: string
  status_id: number
  resolution_id: number

  ticket_statuses?: TicketCommonType
  ticket_resolutions?: TicketCommonType
  ticket_priorities?: TicketCommonType
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

export type InboxesPreferencesType = {
  preference: string
}

export type InboxeType = {
  id: number
  message: string
  created_at: string
}

export type UpdatePasswordFormType = {
  newPassword: string
  confirmPassword: string
}

export type MenuType = {
  label: string
  path: string
  icon: string
}

export type ActivityType = {
  id: number
  type: string
  description: string
  timestamp: string
}
