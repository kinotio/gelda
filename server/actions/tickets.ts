'use server'

import { eq } from 'drizzle-orm'

import { TicketInformationType } from '@/lib/definitions'
import { response } from '@/server/lib/response'
import { database } from '@/server/config/database'
import { tickets } from '@/server/config/schema'

export async function getAll() {
  try {
    const data = await database.query.tickets.findMany({
      with: {
        status: true,
        priority: true,
        resolution: true,
        creator: true
      }
    })
    return response(true, 'Tickets fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching tickets')
  }
}

export async function getById(id: string) {
  try {
    const data = await database.query.tickets.findFirst({
      where: eq(tickets.id, id)
    })
    return response(true, 'Ticket fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching a ticket')
  }
}

export async function create(form: TicketInformationType) {
  try {
    const data = await database.insert(tickets).values(form)
    return response(true, 'Ticket created successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while creating a ticket')
  }
}
