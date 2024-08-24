'use client'

import { useState, useEffect } from 'react'

import {
  list as listAction,
  create as createAction,
  listTicketPriorities as listTicketPrioritiesAction,
  metrics as metricsAction,
  getTicketById as getTicketByIdAction
} from '@/server/actions/tickets'

import { TicketType, TicketFormType, TicketPriorityType } from '@/lib/definitions'

import { useRealtime } from '@/hooks/use-realtime'

export const useTickets = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [ticket, setTicket] = useState<TicketType>()
  const [ticketPriorities, setTicketPriorities] = useState<TicketPriorityType[]>([])
  const [ticketsMetrics, setTicketsMetrics] = useState<any[]>([])

  const { newData } = useRealtime<TicketType>({ table: 'tickets' })

  useEffect(() => {
    if (newData) {
      getTicketByIdAction(newData.id).then((data) =>
        setTickets((prevTickets) => [data[0] as TicketType, ...(prevTickets || [])])
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  const list = async () => {
    setLoading(true)
    listAction({})
      .then((data) => setTickets(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const create = async (form: TicketFormType) => {
    setLoading(true)
    createAction(form)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const getTicketById = async (id: number) => {
    setLoading(true)
    getTicketByIdAction(id)
      .then((data) => setTicket(data[0]))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const listTicketPriorities = async () => {
    setLoading(true)
    listTicketPrioritiesAction()
      .then((data) => setTicketPriorities(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const metrics = async () => {
    setLoading(true)
    metricsAction({})
      .then((data) => setTicketsMetrics(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const states = {
    loading,
    message,
    tickets,
    ticketsMetrics,
    ticketPriorities,
    ticket
  }

  const methods = {
    list,
    create,
    listTicketPriorities,
    metrics,
    getTicketById
  }

  return { ...states, ...methods }
}
