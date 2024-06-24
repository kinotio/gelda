import { useState, useEffect } from 'react'

import { UserInformationPublicType } from '@/lib/definitions'
import { getAll } from '@/server/actions/users'

export function useUsers() {
  const [users, setUsers] = useState<UserInformationPublicType[]>()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const { success, message, data } = await getAll()
        if (success && data) setUsers(data)
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
  }, [])

  return { users, loading, message, success }
}
