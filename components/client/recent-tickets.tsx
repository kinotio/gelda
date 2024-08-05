'use client'

import Link from 'next/link'
import { TicketIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Loader } from '@/components/ui/shared/loader'

import { useUserTickets } from '@/hooks/mod/tickets/use-user-tickets'
import { COLOR_BY_PRIORITY_ID, COLOR_BY_STATUS_ID } from '@/lib/constants'
import { shortText } from '@/lib/utils'

const RecentTickets = () => {
  const { tickets, loading } = useUserTickets({ limit: 13 })

  const hasTickets = Array.isArray(tickets) && tickets.length > 0

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium flex items-center gap-2'>
          <TicketIcon size={20} />
          <span className='text-xl font-bold'>Recent Tickets</span>
        </CardTitle>
        {hasTickets ? (
          <Link className='text-sm text-gray-500 dark:text-gray-400' href='#'>
            View all
          </Link>
        ) : null}
      </CardHeader>
      {loading ? (
        <div className='flex w-full justify-center items-center mt-32'>
          <Loader />
        </div>
      ) : (
        <CardContent>
          {hasTickets ? (
            <Table className='w-full'>
              <TableHeader className='table table-fixed w-full'>
                <TableRow>
                  <TableHead>Ref</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='h-[650px] block overflow-auto'>
                <>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id} className='table table-fixed w-full'>
                      <TableCell>#{ticket.reference}</TableCell>
                      <TableCell className='text-wrap'>{shortText(ticket.title)}</TableCell>
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
                Oops! No tickets found. Looks like it&apos;s time to create a new one !
              </span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export { RecentTickets }
