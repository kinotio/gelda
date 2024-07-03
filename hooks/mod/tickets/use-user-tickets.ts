import { useState, useEffect } from 'react'

import { TicketInformationWithRelationType } from '@/lib/definitions'
import {
  getAllClientTicketsQuery,
  getTicketByIdQuery,
  getAllClientOpenedTicketsQuery,
  getAllClientClosedTicketsQuery
} from '@/server/actions/mod/tickets/queries'

import { useUser } from '@/hooks/mod/users/use-user'
import { useRealtimeTicket } from '@/hooks/mod/tickets/use-realtime-ticket'

import { STATUS_BY_NAME } from '@/lib/constants'

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
        const { success, message, data } = await getAllClientTicketsQuery(user?.id as string)
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
        const { data } = await getTicketByIdQuery(newTicket.id)
        setTickets((prevTickets) => [data, ...(prevTickets || [])])
      }
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTicket])

  return { tickets, message, success, loading }
}

export const useUserOpenedTickets = () => {
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
        const { success, message, data } = await getAllClientOpenedTicketsQuery(user?.id as string)
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
      if (
        newTicket &&
        newTicket.creator_id === user?.id &&
        newTicket.status_id === STATUS_BY_NAME.OPEN
      ) {
        const { data } = await getTicketByIdQuery(newTicket.id)
        setTickets((prevTickets) => [data, ...(prevTickets || [])])
      }
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTicket])

  return { tickets, message, success, loading }
}

export const useUserClosedTickets = () => {
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
        const { success, message, data } = await getAllClientClosedTicketsQuery(user?.id as string)
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
      if (
        newTicket &&
        newTicket.creator_id === user?.id &&
        newTicket.status_id === STATUS_BY_NAME.CLOSED
      ) {
        const { data } = await getTicketByIdQuery(newTicket.id)
        setTickets((prevTickets) => [data, ...(prevTickets || [])])
      }
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTicket])

  return { tickets, message, success, loading }
}
