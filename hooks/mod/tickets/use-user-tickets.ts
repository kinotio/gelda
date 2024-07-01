import { useState, useEffect } from 'react'

import { TicketInformationWithRelationType } from '@/lib/definitions'
import { getUserTickets } from '@/server/actions/tickets'
import { getById } from '@/server/actions/tickets'

import { useUser } from '@/hooks/mod/users/use-user'
import { useRealtimeTicket } from '@/hooks/mod/tickets/use-realtime-ticket'

export const useUserTickets = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [tickets, setTickets] = useState<TicketInformationWithRelationType[]>()

  const { user } = useUser()
  const { newTicket } = useRealtimeTicket()

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

  useEffect(() => {
    const fetch = async () => {
      if (newTicket && newTicket.creator_id === user?.id) {
        const { data } = await getById(newTicket.id)
        setTickets((prevTickets) => [data, ...(prevTickets || [])])
      }
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTicket])

  return { tickets, message, success, loading }
}
