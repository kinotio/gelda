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

export const getAllClientTicketsQuery = async ({
  userId,
  status,
  limit = 7
}: {
  userId: string
  status?: string
  limit?: number
}) => {
  const where =
    status === 'opened'
      ? and(eq(tickets.creatorId, userId), eq(tickets.statusId, STATUS_BY_NAME.OPEN))
      : status === 'closed'
        ? and(eq(tickets.creatorId, userId), eq(tickets.statusId, STATUS_BY_NAME.CLOSED))
        : eq(tickets.creatorId, userId)

  try {
    const data = await database.query.tickets.findMany({
      where,
      with: {
        status: true,
        priority: true,
        resolution: true
      },
      orderBy: [desc(tickets.createdAt)],
      limit
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
