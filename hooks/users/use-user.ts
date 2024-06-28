import { useState, useEffect } from 'react'

import { UserInformationType } from '@/lib/definitions'
import { TOKEN_NAME } from '@/lib/constants'
import { decode } from '@/lib/jsonwebtoken'

import { getById } from '@/server/actions/users'

import { getCookie } from '@/hooks/shared/use-cookie'
import { useSignout } from '@/hooks/auth/use-signout'

export function useUser() {
  const [user, setUser] = useState<UserInformationType>()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const { signOut } = useSignout()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { user_id } = decode(getCookie(TOKEN_NAME))
        const { success, message, data } = await getById(user_id as string)
        if (!data) signOut()
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
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, loading, message, success }
}
