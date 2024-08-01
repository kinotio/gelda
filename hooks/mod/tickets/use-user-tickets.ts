import { useState, useEffect } from 'react'

import { TicketInformationWithRelationType } from '@/lib/definitions'
import { getAllClientTicketsQuery, getTicketByIdQuery } from '@/server/actions/mod/tickets/queries'

import { useUser } from '@/hooks/mod/users/use-user'
import { useRealtimeTicket } from '@/hooks/mod/tickets/use-realtime-ticket'

export const useUserTickets = ({ status, limit }: { status?: string; limit?: number }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [tickets, setTickets] = useState<TicketInformationWithRelationType[]>()

  const { user } = useUser()
  const { newTicket } = useRealtimeTicket()
  const userId = user?.id as string

  useEffect(() => {
    setLoading(true)
    getAllClientTicketsQuery({ userId, status, limit })
      .then(({ success, message, data }) => {
        if (success && data) setTickets(data)
        setMessage(message)
        setSuccess(success)
      })
      .catch((error) => {
        setMessage(
          error instanceof Error ? error.message : 'An error occurred during getting all tickets.'
        )
        setSuccess(false)
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (newTicket) {
      getTicketByIdQuery(newTicket.id)
        .then(({ data }) => {
          setTickets((prevTickets) => [data, ...(prevTickets || [])])
        })
        .catch((error) => console.log(error))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTicket])

  return { tickets, message, success, loading }
}
