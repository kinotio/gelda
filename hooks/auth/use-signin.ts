import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { PATH, TOKEN_NAME } from '@/lib/constants'
import { useCookie } from '@/hooks/shared/use-cookie'
import { CookieOptionsType, AuthSignInFormType } from '@/lib/definitions'
import { signin } from '@/server/actions/auth'

export const useSignin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const [_, setUserToken] = useCookie(TOKEN_NAME, '') as [
    string,
    (value: string, options: CookieOptionsType) => void
  ]

  const router = useRouter()

  const signIn = async (form: AuthSignInFormType) => {
    setLoading(true)
    try {
      const { success, message, data } = await signin(form)
      setMessage(message)
      setSuccess(success)
      if (success && data) {
        setUserToken(data, { days: 7, path: '/', SameSite: 'Strict', Secure: true })
        router.push(PATH.CLIENT)
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred during sign in.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return { signIn, loading, message, success }
}
