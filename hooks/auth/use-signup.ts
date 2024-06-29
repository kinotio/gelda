import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { PATH } from '@/lib/constants'
import { AuthSignUpFormType } from '@/lib/definitions'
import { signup } from '@/server/actions/auth'

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const router = useRouter()

  const signUp = async (form: AuthSignUpFormType) => {
    setLoading(true)
    try {
      const { success, message } = await signup(form)
      setMessage(message)
      setSuccess(success)
      if (success) {
        router.push(PATH.SIGNIN)
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred during sign up.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return { signUp, loading, message, success }
}
