'use server'

import { eq, desc, and } from 'drizzle-orm'

import { response } from '@/server/lib/helpers'
import { database } from '@/server/config/database'
import { tickets } from '@/server/config/schema'
import { STATUS_BY_NAME } from '@/lib/constants'

export const getAllTicketsQuery = async () => {
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

export const getAllClientTicketsQuery = async (userId: string) => {
  try {
    const data = await database.query.tickets.findMany({
      where: eq(tickets.creatorId, userId),
      with: {
        status: true,
        priority: true,
        resolution: true
      },
      orderBy: [desc(tickets.createdAt)],
      limit: 7
    })
    return response(true, 'Tickets fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching tickets')
  }
}

export const getTicketByIdQuery = async (id: string) => {
  try {
    const data = await database.query.tickets.findFirst({
      where: eq(tickets.id, id),
      with: {
        status: true,
        priority: true,
        resolution: true
      }
    })
    return response(true, 'Ticket fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching a ticket')
  }
}

export const getAllClientOpenedTicketsQuery = async (userId: string) => {
  try {
    const data = await database.query.tickets.findMany({
      where: and(eq(tickets.creatorId, userId), eq(tickets.statusId, STATUS_BY_NAME.OPEN)),
      with: {
        status: true,
        priority: true,
        resolution: true
      },
      orderBy: [desc(tickets.createdAt)],
      limit: 3
    })
    return response(true, 'Ticket fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching a ticket')
  }
}

export const getAllClientClosedTicketsQuery = async (userId: string) => {
  try {
    const data = await database.query.tickets.findMany({
      where: and(eq(tickets.creatorId, userId), eq(tickets.statusId, STATUS_BY_NAME.CLOSED)),
      with: {
        status: true,
        priority: true,
        resolution: true
      },
      orderBy: [desc(tickets.createdAt)],
      limit: 3
    })
    return response(true, 'Ticket fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching a ticket')
  }
}
