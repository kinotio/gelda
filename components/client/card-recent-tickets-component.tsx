'use client'

import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { useUserTickets } from '@/hooks/mod/tickets/use-user-tickets'
import { COLOR_BY_PRIORITY_ID, COLOR_BY_STATUS_ID } from '@/lib/constants'

const CardRecentTicketsComponent = () => {
  const { tickets } = useUserTickets()

  const hasTickets = Array.isArray(tickets) && tickets.length > 0

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Recent Tickets</CardTitle>
        {hasTickets ? (
          <Link className='text-sm text-gray-500 dark:text-gray-400' href='#'>
            View all
          </Link>
        ) : null}
      </CardHeader>
      <CardContent className='h-[500px] overflow-auto'>
        {hasTickets ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ref</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <Link className='font-medium' href='#'>
                        #{ticket.reference}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link className='font-medium' href='#'>
                        {ticket.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`capitalize inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${COLOR_BY_STATUS_ID[ticket.statusId]}`}
                      >
                        {ticket.status?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`capitalize inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${COLOR_BY_PRIORITY_ID[ticket.priorityId]}`}
                      >
                        {ticket.priority?.name}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            </TableBody>
          </Table>
        ) : (
          <div className='flex justify-center mt-12 items-center'>
            <span className='text-sm w-80 text-center'>
              Oops! No tickets found. Looks like it&apos;s time to create a new ticket!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { CardRecentTicketsComponent }
