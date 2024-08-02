'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

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

import { useTickets } from '@/hooks/mod/tickets/use-tickets'

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
    accessorKey: 'creator',
    header: ({ column }) => <div className='text-left'>Creator</div>,
    cell: ({ row }) => <div className='capitalize'>{row.original.creator?.name}</div>
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
  const { loading, tickets } = useTickets()

  return (
    <div className='flex min-h-[calc(92vh_-_theme(spacing.16))] flex-1 flex-col gap-8 p-6 md:gap-12 md:p-12'>
      {loading ? (
        <div className='w-full h-[60vh] flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <>
          {Array.isArray(tickets) && tickets.length > 0 ? (
            <DataTable data={tickets} columns={columns} />
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

export default Page
