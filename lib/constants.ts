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

  AUTH: '/auth',

  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  CLIENT: '/c',
  CLIENT_OVERVIEW: '/c/overview',
  CLIENT_TICKETS: '/c/tickets',
  CLIENT_DISCUSSIONS: '/c/discussions',
  CLIENT_ACTIVITIES: '/c/activities',
  CLIENT_SETTINGS: '/c/settings',

  ADMIN: '/a',
  ADMIN_DASHBOARD: '/a/dashboard',
  ADMIN_USERS: '/a/users',
  ADMIN_TICKETS: '/a/tickets',
  ADMIN_TICKETS_VIEW: '/a/tickets/[id]',
  ADMIN_AI: '/a/ai',
  ADMIN_SETTINGS: '/a/settings'
}

export const COLOR_BY_STATUS_ID: { [key: number]: string } = {
  0: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400',
  1: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  2: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400',
  3: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
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

const METRIC_TYPES = {
  STATUS: 'status',
  PRIORITY: 'priority',
  RESOLUTION: 'resolution'
}

const METRIC_NAMES = {
  OPEN: 'open',
  CLOSED: 'closed',
  IN_PROGRESS: 'in progress',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  RESOLVED: 'resolved',
  UNRESOLVED: 'unresolved'
}

export const METRICS = [
  {
    type: METRIC_TYPES.STATUS,
    name: METRIC_NAMES.OPEN,
    description: 'Opened tickets',
    count: 0
  },
  {
    type: METRIC_TYPES.STATUS,
    name: METRIC_NAMES.CLOSED,
    description: 'Closed tickets',
    count: 0
  },
  {
    type: METRIC_TYPES.STATUS,
    name: METRIC_NAMES.IN_PROGRESS,
    description: 'In Progress tickets',
    count: 0
  },
  {
    type: METRIC_TYPES.PRIORITY,
    name: METRIC_NAMES.LOW,
    description: 'Low priority tickets',
    count: 0
  },
  {
    type: METRIC_TYPES.PRIORITY,
    name: METRIC_NAMES.MEDIUM,
    description: 'Medium priority tickets',
    count: 0
  },
  {
    type: METRIC_TYPES.PRIORITY,
    name: METRIC_NAMES.HIGH,
    description: 'High priority tickets',
    count: 0
  },
  {
    type: METRIC_TYPES.RESOLUTION,
    name: METRIC_NAMES.RESOLVED,
    description: 'Resolved tickets',
    count: 0
  },
  {
    type: METRIC_TYPES.RESOLUTION,
    name: METRIC_NAMES.UNRESOLVED,
    description: 'Unresolved tickets',
    count: 0
  }
]

export const ACTIVITIES_TYPES = [
  'unknown',
  'login',
  'account_created',
  'password_change',
  'ticket_created',
  'inboxes_preferences_change',
  'profile_information_change',
  'logout'
] as string[]

export const BADGE_VARIANT: { [key: number]: string } = {
  1: 'secondary',
  2: 'default',
  3: 'destructive'
}

export const BADGE_BY_RESOLUTION_ID: { [key: number]: string } = {
  1: 'default',
  2: 'destructive'
}
