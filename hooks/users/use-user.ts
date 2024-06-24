import { useState, useEffect } from 'react'

import { UserInformationType } from '@/lib/definitions'
import { getById } from '@/server/actions/users'

export function useUser(id: string) {
  const [user, setUser] = useState<UserInformationType>()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const { success, message, data } = await getById(id)
        if (success && data) setUser(data)
        setMessage(message)
        setSuccess(success)
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'An error occurred during getting ticket.'
        )
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  return { user, loading, message, success }
}
