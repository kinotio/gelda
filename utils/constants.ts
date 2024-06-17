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
  SUPPORT: 2,
  ADMIN: 3
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

export const PATH = {
  HOME: '/',
  CLIENT: '/client',
  ADMIN: '/admin',
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup'
}

export const TOKEN_NAME = 'access-token'
