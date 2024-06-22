'use server'

import { ticketsMethods as tickets } from '@/server/data/tickets'
import { TicketInformationType } from '@/lib/definitions'
import { response } from '@/server/lib/response'

export async function getAllTickets() {
  try {
    const data = await tickets.get()
    return response(true, 'Tickets fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching tickets')
  }
}

export async function getTicketById(id: string) {
  try {
    const data = await tickets.getById(id)
    return response(true, 'Ticket fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching a ticket')
  }
}

export async function createTicket(form: TicketInformationType) {
  try {
    const data = await tickets.create(form)
    return response(true, 'Ticket created successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while creating a ticket')
  }
}
