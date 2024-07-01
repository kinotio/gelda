'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { useUsers } from '@/hooks/mod/users/use-users'
import { useTickets } from '@/hooks/mod/tickets/use-tickets'

import { STATUS_BY_NAME, RESOLUTION_BY_NAME } from '@/lib/constants'

const DashboardMetricsComponent = () => {
  const { loading: usersLoading, users } = useUsers()
  const { loading: ticketsLoading, tickets } = useTickets()

  const openedTickets = tickets?.filter((t) => t.statusId === STATUS_BY_NAME.OPEN)
  const closedTickets = tickets?.filter((t) => t.statusId === STATUS_BY_NAME.CLOSED)
  const resolvedTickets = tickets?.filter((t) => t.resolutionId === RESOLUTION_BY_NAME.RESOLVED)
  const unresolvedTickets = tickets?.filter((t) => t.resolutionId === RESOLUTION_BY_NAME.UNRESOLVED)

  return (
    <>
      {usersLoading || ticketsLoading ? null : (
        <div className='grid gap-12 md:grid-cols-2'>
          <Card className='bg-primary text-primary-foreground p-8'>
            <CardHeader className='flex flex-row items-center justify-between pb-3'>
              <CardTitle className='text-base font-medium'>Total Users</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <div className='text-6xl font-bold'>{users?.length}</div>
            </CardContent>
          </Card>
          <Card className='bg-gray-700 text-primary-foreground p-8'>
            <CardHeader className='flex flex-row items-center justify-between pb-3'>
              <CardTitle className='text-base font-medium'>Total Tickets</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <div className='text-6xl font-bold'>{tickets?.length}</div>
            </CardContent>
          </Card>
          <Card className='bg-secondary text-secondary-foreground p-8'>
            <CardHeader className='flex flex-row items-center justify-between pb-3'>
              <CardTitle className='text-base font-medium'>Opened Tickets</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <div className='text-6xl font-bold'>{openedTickets?.length}</div>
            </CardContent>
          </Card>
          <Card className='bg-muted text-muted-foreground p-8'>
            <CardHeader className='flex flex-row items-center justify-between pb-3'>
              <CardTitle className='text-base font-medium'>Closed Tickets</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <div className='text-6xl font-bold'>{closedTickets?.length}</div>
            </CardContent>
          </Card>
          <Card className='text-success-foreground p-8'>
            <CardHeader className='flex flex-row items-center justify-between pb-3'>
              <CardTitle className='text-base font-medium'>Resolved Tickets</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <div className='text-6xl font-bold'>{resolvedTickets?.length}</div>
            </CardContent>
          </Card>
          <Card className='bg-gray-800 text-success-foreground p-8'>
            <CardHeader className='flex flex-row items-center justify-between pb-3'>
              <CardTitle className='text-white text-base font-medium'>Unresolved Tickets</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <div className='text-white text-6xl font-bold'>{unresolvedTickets?.length}</div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export { DashboardMetricsComponent }
