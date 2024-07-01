import { useState, useEffect } from 'react'

import { UserInformationPublicType } from '@/lib/definitions'
import { getAllUsersQuery } from '@/server/actions/mod/users/queries'

export const useUsers = () => {
  const [users, setUsers] = useState<UserInformationPublicType[]>()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getAllUsersQuery()
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
    }

    fetch()
  }, [])

  return { users, loading, message, success }
}
