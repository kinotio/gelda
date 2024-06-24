import { useState } from 'react'

import { TicketInformationType } from '@/lib/definitions'
import { create } from '@/server/actions/tickets'

export function useCreateTicket() {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const createTicket = async (form: TicketInformationType) => {
    setLoading(true)

    try {
      const { success, message } = await create(form)
      if (success) {
        setMessage(message)
        setSuccess(success)
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'An error occurred during creating ticket.'
      )
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return { createTicket, message, success, loading }
}
