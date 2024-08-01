// Auth-related types
export type AuthSignInFormType = {
  email: string
  password: string
}

export type AuthSignUpFormType = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// User-related types
export type UserInformationBaseType = {
  id: string
  name: string
  email: string
}

export type UserInformationType = {
  hashedPassword: string
  roleId: number
} & UserInformationBaseType

export type UserInformationPublicType = {
  id: string
  createdAt: string
} & UserInformationBaseType

// Ticket-related types
export type TicketInformationType = {
  id?: string
  title: string
  description: string
  statusId: number
  priorityId: number
  creatorId: string
  resolutionId?: number
  reference?: number
}

export type TicketInformationExtraType = {
  createdAt: string
  updateAt: string
}

export type TicketInformationWithRelationType = {
  status?: Record<string, string | number>
  priority?: Record<string, string | number>
  resolution?: Record<string, string | number>
  creator?: Record<string, string | number>
} & TicketInformationType &
  TicketInformationExtraType

export type TicketInformationFormType = {
  title: string
  description: string
  priorityId: number
}

export type TicketInformationFromRealtimeType = {
  created_at: string
  creator_id: string
  description: string
  id: string
  priority_id: number
  reference: number
  resolution_id: number | undefined
  responsible_id: string | undefined
  status_id: number
  title: string
  updated_at: string | undefined
}

// Common-related types
export type CommonIdAndNameType = {
  id: number
  name: string
}

// Status-related types
export type StatusType = CommonIdAndNameType

// Priority-related types
export type PriorityType = CommonIdAndNameType

// Role-related types
export type RoleType = CommonIdAndNameType

// Cookie-related types
export type CookieOptionsType = {
  days?: number
  path?: string
  domain?: string
  SameSite?: 'None' | 'Lax' | 'Strict'
  Secure?: boolean
  HttpOnly?: boolean
}

// Session Token-related types
export type SessionTokenType = {
  id: number
  token: string
  tokenVersion: number
  userId: string
  createdAt: string
  updateAt: string
}
