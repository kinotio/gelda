import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { PATH, TOKEN_NAME } from '@/lib/constants'
import { useCookie } from '@/hooks/use-cookie'
import { TCookieOptions, AuthSignInFormType, AuthSignUpFormType } from '@/lib/definitions'
import { signin, signup } from '@/server/actions/auth'

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const [_, setUserToken] = useCookie(TOKEN_NAME, '') as [
    string,
    (value: string, options: TCookieOptions) => void
  ]

  const router = useRouter()

  const signIn = async (form: AuthSignInFormType) => {
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
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (form: AuthSignUpFormType) => {
    setLoading(true)
    try {
      const { success, message } = await signup(form)
      if (success) {
        router.push(PATH.SIGNIN)
        setSuccess(true)
      } else {
        setMessage(message)
        setSuccess(false)
      }
    } catch (error) {
      setMessage('An error occurred during sign up.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUserToken('', { days: 0, path: '/', SameSite: 'Strict', Secure: true })
    router.push(PATH.SIGNIN)
  }

  return { loading, signIn, signUp, signOut, message, success }
}
