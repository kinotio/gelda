import { useState, useEffect } from 'react'

import { TicketInformationWithRelationType } from '@/lib/definitions'
import { getAllTicketsQuery } from '@/server/actions/mod/tickets/queries'

export const useTickets = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [tickets, setTickets] = useState<TicketInformationWithRelationType[]>()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getAllTicketsQuery()
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
  }, [])

  return { tickets, message, success, loading }
}
