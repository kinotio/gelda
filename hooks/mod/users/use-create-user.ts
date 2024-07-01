import { useState } from 'react'

import { UserInformationType } from '@/lib/definitions'
import { createUserMutation } from '@/server/actions/mod/users/mutations'

export const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const createUser = async (user: UserInformationType) => {
    setLoading(true)
    try {
      const { success, message } = await createUserMutation(user)
      setMessage(message)
      setSuccess(success)
      setLoading(false)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred during creating user.')
      setSuccess(false)
    }
  }

  return { createUser, loading, message, success }
}
