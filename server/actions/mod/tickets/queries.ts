'use server'

import { eq, desc, and, count } from 'drizzle-orm'

import { database } from '@/server/config/database'
import { tickets } from '@/server/config/schema'

import { STATUS_BY_NAME, METRICS } from '@/lib/constants'
import { response } from '@/server/lib/helpers'
import { MetricType } from '@/lib/definitions'

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

export const getTicketsCountQuery = async ({ userId }: { userId: string }) => {
  try {
    const results = await database
      .select({
        statusId: tickets.statusId,
        priorityId: tickets.priorityId,
        resolutionId: tickets.resolutionId,
        count: count()
      })
      .from(tickets)
      .where(eq(tickets.creatorId, userId))
      .groupBy(tickets.statusId, tickets.priorityId, tickets.resolutionId)

    const metricsMap: Record<string, MetricType> = METRICS.reduce((acc: any, metric) => {
      acc[`${metric.type}-${metric.name}`] = metric
      return acc
    }, {})

    results.forEach(({ statusId, priorityId, resolutionId, count }) => {
      if (statusId !== null) {
        if (statusId === 1) metricsMap['status-open'].count = count
        if (statusId === 2) metricsMap['status-closed'].count = count
        if (statusId === 3) metricsMap['status-inProgress'].count = count
      }

      if (priorityId !== null) {
        if (priorityId === 1) metricsMap['priority-low'].count = count
        if (priorityId === 2) metricsMap['priority-medium'].count = count
        if (priorityId === 3) metricsMap['priority-high'].count = count
      }

      if (resolutionId !== null) {
        if (resolutionId === 1) metricsMap['resolution-resolved'].count = count
        if (resolutionId === 2) metricsMap['resolution-unresolved'].count = count
      }
    })
    const data: MetricType[] = Object.values(metricsMap)

    return response(true, 'Tickets count fetched successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while fetching tickets count')
  }
}
