import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { UserInformationType } from '@/lib/definitions'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getInitials = (user: UserInformationType | undefined) => {
  if (user === null || user === undefined) return 'N/A'
  return user.name
    .match(/(\b\S)?/g)
    ?.join('')
    .toUpperCase()
}
