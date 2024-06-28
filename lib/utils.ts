import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { UserInformationType } from '@/lib/definitions'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(user: UserInformationType | undefined): string {
  if (user === null || user === undefined) return 'N/A'
  return user.name
    .match(/(\b\S)?/g)
    ?.join('')
    .toUpperCase() as string
}
