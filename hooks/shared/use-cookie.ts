import { useCallback, useState } from 'react'

import { CookieOptionsType } from '@/lib/definitions'

export const useCookie = (key: string, initialValue: string) => {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue)
  })

  const updateItem = useCallback(
    (value: string, options: CookieOptionsType) => {
      setItem(value)
      setCookie(key, value, options)
    },
    [key]
  )

  return [item, updateItem]
}

export const stringifyOptions = (options: {
  [key: string]: boolean | number | string | undefined
}) => {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'days') {
      return acc
    } else {
      if (options[key] === false) {
        return acc
      } else if (options[key] === true) {
        return `${acc}; ${key}`
      } else {
        return `${acc}; ${key}=${options[key]}`
      }
    }
  }, '')
}

export const setCookie = (key: string, value: string, options: CookieOptionsType) => {
  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...options
  }

  const expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString()

  document.cookie =
    key +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    stringifyOptions(optionsWithDefaults)
}

export const getCookie = (name: string, initialValue = '') => {
  return (
    document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=')
      return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '') || initialValue
  )
}
