import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) => {
  let d = new Date(date)
  let day = d.getDate().toString().padStart(2, '0')
  let month = (d.getMonth() + 1).toString().padStart(2, '0')
  let year = d.getFullYear().toString().slice(-2)
  let minutes = d.getMinutes().toString().padStart(2, '0')
  let hours = d.getHours().toString().padStart(2, '0')
  let seconds = d.getSeconds().toString().padStart(2, '0')

  return `${day}-${month}-${year} ${minutes}:${hours}:${seconds}`
}

export const getCurrentYear = () => new Date().getFullYear()

export const shortText = (text: string) => {
  if (!text || text === '') return '-'
  return text.slice(0, 10) + '...'
}
export const sluggify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const readableTimestamp = (isoTimestamp: string) => {
  const locale = navigator.language || 'en-US'
  const date = new Date(isoTimestamp)

  return date.toLocaleString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  })
}

export const formatToReadable = (text: string): string => {
  return text
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
}
