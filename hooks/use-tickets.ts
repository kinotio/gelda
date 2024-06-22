import { useState, useEffect } from 'react'

import { TTicket } from '@/types/main'

import { getAllTickets } from '@/server/actions/tickets'

export function useTickets() {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [tickets, setTickets] = useState<TTicket>()

  const getTickets = async () => {
    try {
      const { success, message, data } = await getAllTickets()
      if (success && data) {
        setTickets(data)
        setSuccess(true)
      } else {
        setMessage(message)
        setSuccess(false)
      }
    } catch (error) {
      setMessage('An error occurred during getting all tickets.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTickets()
  }, [])

  return { tickets, message, success, loading }
}
