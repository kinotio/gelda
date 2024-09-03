'use client'

import { useEffect } from 'react'
import { icons } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'

import { useTickets } from '@/hooks/use-tickets'
import { useUsers } from '@/hooks/use-users'

import { STATUS_BY_NAME, RESOLUTION_BY_NAME } from '@/lib/constants'

const Page = () => {
  const {
    loading: loadingTickets,
    total: totalTickets,
    listAll: listAllTickets,
    allTickets
  } = useTickets()
  const { loading: loadingUsers, total: totalUsers, listAll: listAllUsers } = useUsers()

  const openedTickets = allTickets?.filter((t) => t.status_id === STATUS_BY_NAME.OPEN)
  const inProgressTickets = allTickets?.filter((t) => t.status_id === STATUS_BY_NAME.IN_PROGRESS)
  const closedTickets = allTickets?.filter((t) => t.status_id === STATUS_BY_NAME.CLOSED)
  const unknownTickets = allTickets?.filter((t) => t.resolution_id === RESOLUTION_BY_NAME.UNKNOWN)
  const resolvedTickets = allTickets?.filter((t) => t.resolution_id === RESOLUTION_BY_NAME.RESOLVED)
  const unresolvedTickets = allTickets?.filter(
    (t) => t.resolution_id === RESOLUTION_BY_NAME.UNRESOLVED
  )

  const metrics = [
    {
      label: 'Total Users',
      count: totalUsers,
      icon: 'Users'
    },
    {
      label: 'Total Tickets',
      count: totalTickets,
      icon: 'Ticket'
    },
    {
      label: 'Opened Tickets',
      count: openedTickets?.length,
      icon: 'Ticket'
    },
    {
      label: 'In Progress Tickets',
      count: inProgressTickets?.length,
      icon: 'Ticket'
    },
    {
      label: 'Closed Tickets',
      count: closedTickets?.length,
      icon: 'Ticket'
    },
    {
      label: 'Unknown Tickets',
      count: unknownTickets?.length,
      icon: 'Ticket'
    },
    {
      label: 'Resolved Tickets',
      count: resolvedTickets?.length,
      icon: 'Ticket'
    },
    {
      label: 'Unresolved Tickets',
      count: unresolvedTickets?.length,
      icon: 'Ticket'
    }
  ]

  useEffect(() => {
    listAllTickets()
    listAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-[50px] mb-[100px]'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <CardTitle className='text-sm font-medium'>{metric.label}</CardTitle>
              <Icon
                name={metric.icon as keyof typeof icons}
                size={16}
                className='text-muted-foreground'
              />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{metric.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page
