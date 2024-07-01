import { useState, useEffect } from 'react'

import { UserInformationType } from '@/lib/definitions'
import { TOKEN_NAME } from '@/lib/constants'
import { decode } from '@/lib/jsonwebtoken'

import { getUserByIdQuery } from '@/server/actions/mod/users/queries'

import { getCookie } from '@/hooks/shared/use-cookie'
import { useSignout } from '@/hooks/auth/use-signout'

export const useUser = () => {
  const [user, setUser] = useState<UserInformationType>()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const { signOut } = useSignout()

  const { user_id } = decode(getCookie(TOKEN_NAME)) as { user_id: string }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getUserByIdQuery(user_id as string)
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
  }, [user_id])

  return { user, loading, message, success }
}
