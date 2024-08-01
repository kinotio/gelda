'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Loader } from '@/components/ui/shared/loader'

import { useUsers } from '@/hooks/mod/users/use-users'
import { useTickets } from '@/hooks/mod/tickets/use-tickets'

import { STATUS_BY_NAME, RESOLUTION_BY_NAME } from '@/lib/constants'

const Metrics = () => {
  const { loading: usersLoading, users } = useUsers()
  const { loading: ticketsLoading, tickets } = useTickets()

  const openedTickets = tickets?.filter((t) => t.statusId === STATUS_BY_NAME.OPEN)
  const closedTickets = tickets?.filter((t) => t.statusId === STATUS_BY_NAME.CLOSED)
  const resolvedTickets = tickets?.filter((t) => t.resolutionId === RESOLUTION_BY_NAME.RESOLVED)
  const unresolvedTickets = tickets?.filter((t) => t.resolutionId === RESOLUTION_BY_NAME.UNRESOLVED)

  const metrics = [
    {
      label: 'Total Users',
      count: users?.length
    },
    {
      label: 'Total Tickets',
      count: tickets?.length
    },
    {
      label: 'Opened Tickets',
      count: openedTickets?.length
    },
    {
      label: 'Closed Tickets',
      count: closedTickets?.length
    },
    {
      label: 'Resolved Tickets',
      count: resolvedTickets?.length
    },
    {
      label: 'Unresolved Tickets',
      count: unresolvedTickets?.length
    }
  ]

  return (
    <>
      {usersLoading || ticketsLoading ? (
        <div className='w-full h-[60vh] flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <div className='grid gap-12 md:grid-cols-2'>
          {metrics.map((metric, idx) => (
            <Card className='p-8' key={idx}>
              <CardHeader className='flex flex-row items-center justify-between pb-3'>
                <CardTitle className='text-base font-medium'>{metric.label}</CardTitle>
              </CardHeader>
              <CardContent className='flex items-center justify-center'>
                <div className='text-6xl font-bold'>{metric.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}

export { Metrics }
