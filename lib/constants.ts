import pkg from '@/package.json'

export const APP_VERSION = pkg.version

export const NAME_PATTERN = {
  value: /^[A-Za-z\s]+$/,
  message: 'Name should only contain letters and spaces'
}

export const EMAIL_PATTERN = {
  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  message: 'Please enter a valid email address'
}

export const PASSWORD_PATTERN = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message:
    'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
}

export const PG_UNIQUE_VIOLATION_ERROR_CODE = 23505

export const ROLE_BY_NAME = {
  CLIENT: 1,
  ADMIN: 2
}

export const STATUS_BY_NAME = {
  OPEN: 1,
  IN_PROGRESS: 2,
  CLOSED: 3
}

export const PRIORITY_BY_NAME = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3
}

export const RESOLUTION_BY_NAME = {
  RESOLVED: 1,
  UNRESOLVED: 2
}

export const PATH = {
  HOME: '/',

  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',

  CLIENT: '/client',
  CLIENT_DASHBOARD: '/client/dashboard',

  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_TICKETS: '/admin/tickets',
  ADMIN_TICKETS_VIEW: '/admin/tickets/[id]',
  ADMIN_AI: '/admin/ai',
  ADMIN_SETTINGS: '/admin/settings'
}

export const TOKEN_NAME = 'access-token'

export const COLOR_BY_STATUS_ID: { [key: number]: string } = {
  0: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400',
  1: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  2: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
  3: 'bg-yellow-100 text-yellow-6000 dark:bg-yellow-900 dark:text-yellow-400'
}

export const COLOR_BY_PRIORITY_ID: { [key: number]: string } = {
  0: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400',
  1: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  2: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400',
  3: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
}

export const COLOR_BY_RESOLUTION_ID: { [key: number]: string } = {
  0: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400',
  1: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  2: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
}
