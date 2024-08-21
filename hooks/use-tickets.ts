'use client'

import { useState } from 'react'

import {
  list as listAction,
  create as createAction,
  listTicketPriorities as listTicketPrioritiesAction
} from '@/server/actions/tickets'

import { TicketType, TicketFormType, TicketPriorityType } from '@/lib/definitions'

export const useTickets = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [ticketPriorities, setTicketPriorities] = useState<TicketPriorityType[]>([])

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

  const listTicketPriorities = async () => {
    setLoading(true)
    listTicketPrioritiesAction()
      .then((data) => setTicketPriorities(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  return { loading, message, tickets, list, create, listTicketPriorities, ticketPriorities }
}
