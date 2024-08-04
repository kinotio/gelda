'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/datatable'
import { Loader } from '@/components/ui/shared/loader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { useUserTickets } from '@/hooks/mod/tickets/use-user-tickets'
import { useUserTicketsMetrics } from '@/hooks/mod/tickets/use-user-tickets-metrics'

import { TicketInformationWithRelationType } from '@/lib/definitions'
import { COLOR_BY_STATUS_ID, COLOR_BY_PRIORITY_ID, COLOR_BY_RESOLUTION_ID } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

const columns: ColumnDef<TicketInformationWithRelationType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('title')}</div>
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span
        className={`capitalize inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${COLOR_BY_STATUS_ID[row.original.statusId ?? 0]}`}
      >
        {row.original.status?.name}
      </span>
    )
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span
        className={`capitalize inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${COLOR_BY_PRIORITY_ID[row.original.priorityId ?? 0]}`}
      >
        {row.original.priority?.name}
      </span>
    )
  },
  {
    accessorKey: 'resolution',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Resolution
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span
        className={`capitalize inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${COLOR_BY_RESOLUTION_ID[row.original.resolutionId ?? 0]}`}
      >
        {row.original.resolution?.name}
      </span>
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='capitalize'>{formatDate(row.original.createdAt?.toString() as string)}</div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

const Page = () => {
  const { loading: isTicketsLoading, tickets } = useUserTickets({ limit: 0 })

  return (
    <div className='flex min-h-[calc(92vh_-_theme(spacing.16))] flex-1 flex-col gap-6 p-6 md:p-12'>
      <Metrics />

      {isTicketsLoading ? (
        <div className='w-full h-[40vh] flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <>
          {Array.isArray(tickets) && tickets.length > 0 ? (
            <DataTable data={tickets} columns={columns} options={{ pageSize: 7 }} />
          ) : (
            <Card className='p-8'>
              <CardContent className='flex items-center justify-center pt-6'>
                <div className='text-2xl font-bold'>Oops, no tickets have been created for now</div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

const Metrics = () => {
  const { loading: isTicketsMetricsLoading, metrics } = useUserTicketsMetrics()

  const handleScroll = (left: number) => {
    const container = document.getElementById('scroll-container')
    if (container) container.scrollTo({ left, behavior: 'smooth' })
  }

  return (
    <section className='bg-white'>
      <div className='flex justify-between items-center mb-4'>
        <Button variant='ghost' onClick={() => handleScroll(0)}>
          <h2 className='text-2xl font-bold cursor-pointer'>Metrics</h2>
        </Button>

        <Button variant='ghost' onClick={() => handleScroll(200)}>
          <ArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>

      {isTicketsMetricsLoading ? (
        <div className='w-full flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <div id='scroll-container' className='overflow-x-auto custom-scroll'>
          <div className='grid grid-flow-col auto-cols-max gap-4'>
            <>
              {Array.isArray(metrics) && metrics.length > 0 ? (
                <>
                  {metrics.map((metric, idx) => (
                    <Card key={idx} className='col-span-1 w-64'>
                      <CardContent className='flex justify-between items-center p-6'>
                        <div>
                          <Badge variant='secondary'>{metric.type}</Badge>
                          <h3 className='text-lg font-semibold capitalize'>{metric.name}</h3>
                          <p className='text-sm text-muted-foreground'>{metric.description}</p>
                        </div>
                        <span className='text-3xl font-bold'>{metric.count}</span>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card className='w-[94vw] p-8'>
                  <CardContent className='flex items-center justify-center pt-6'>
                    <div className='text-2xl font-bold'>
                      Oops, no tickets metrics have been found for now
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          </div>
        </div>
      )}
    </section>
  )
}

export default Page
