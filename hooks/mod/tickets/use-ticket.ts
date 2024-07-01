import { useState, useEffect } from 'react'

import { TicketInformationType } from '@/lib/definitions'
import { getById } from '@/server/actions/tickets'

export const useTicket = (id: string) => {
  const [ticket, setTicket] = useState<TicketInformationType>()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getById(id)
        if (success && data) setTicket(data)
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
  }, [id])

  return { ticket, message, success, loading }
}
