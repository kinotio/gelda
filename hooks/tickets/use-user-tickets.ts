import { useState, useEffect } from 'react'

import { TicketInformationWithRelationType } from '@/lib/definitions'
import { getUserTickets } from '@/server/actions/tickets'

import { useUser } from '@/hooks/users/use-user'

export function useUserTickets() {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [tickets, setTickets] = useState<TicketInformationWithRelationType[]>()

  const { user } = useUser()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getUserTickets(user?.id as string)
        if (success && data) setTickets(data)
        setMessage(message)
        setSuccess(success)
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'An error occurred during getting all tickets.'
        )
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [user])

  return { tickets, message, success, loading }
}
