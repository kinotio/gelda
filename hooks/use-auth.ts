import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { signin } from '@/actions/auth'

import { TSignInForm } from '@/types'

import { PATH, TOKEN_NAME } from '@/utils/constants'

import { useCookie } from '@/hooks/use-cookie'

import { TUseAuthResult, TCookieOptions } from '@/types'

export function useAuth(): TUseAuthResult {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const [_, setUserToken] = useCookie(TOKEN_NAME, '') as [
    string,
    (value: string, options: TCookieOptions) => void
  ]

  const router = useRouter()

  const signIn = async (form: TSignInForm) => {
    setLoading(true)
    try {
      const { success, message, data } = await signin(form)
      if (success && data) {
        setUserToken(data, { days: 7, path: '/', SameSite: 'Strict', Secure: true })
        router.push(PATH.CLIENT)
        setSuccess(true)
      } else {
        setMessage(message)
        setSuccess(false)
      }
    } catch (error) {
      setMessage('An error occurred during sign in.')
      console.error('Sign in error:', error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUserToken('', { days: 0, path: '/', SameSite: 'Strict', Secure: true })
    router.push(PATH.SIGNIN)
  }

  return { loading, signIn, signOut, message, success }
}
