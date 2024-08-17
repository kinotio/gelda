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
