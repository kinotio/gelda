'use client'

import { useEffect } from 'react'
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
import { Badge } from '@/components/ui/badge'

import { useTickets } from '@/hooks/use-tickets'

import { BADGE_VARIANT, PATH } from '@/lib/constants'
import { shortText } from '@/lib/utils'

const Recents = () => {
  const { tickets, loading, list } = useTickets()

  const hasTickets = Array.isArray(tickets) && tickets.length > 0

  useEffect(() => {
    list()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium flex items-center gap-2'>
          <TicketIcon size={20} />
          <span className='text-xl font-bold'>Recent Tickets</span>
        </CardTitle>
        {hasTickets ? (
          <Link
            className='text-sm text-gray-500 dark:text-gray-400'
            href={PATH.CLIENT_TICKETS}
            prefetch={false}
          >
            View all
          </Link>
        ) : null}
      </CardHeader>

      <CardContent>
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
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className='table table-fixed w-full'>
                    <TableCell>#{ticket.id}</TableCell>
                    <TableCell className='text-wrap'>{shortText(ticket.title)}</TableCell>
                    <TableCell>
                      <Badge variant={BADGE_VARIANT[ticket.status_id] as any}>
                        {ticket.ticket_statuses?.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={BADGE_VARIANT[ticket.priority_id] as any}>
                        {ticket.ticket_priorities?.name}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>

        {/* <div className='flex justify-center mt-12 items-center'>
            <span className='text-sm w-80 text-center'>
              Oops! No tickets found. Looks like it&apos;s time to create a new one !
            </span>
          </div> */}
      </CardContent>
    </Card>
  )
}

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <TableRow key={idx} className='table table-fixed w-full'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <TableCell key={idx}>
              <div className='h-6 w-full rounded-md bg-muted' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export { Recents }
