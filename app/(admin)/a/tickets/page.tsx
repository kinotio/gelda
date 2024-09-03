'use client'

import { useEffect, useState } from 'react'
import { SearchIcon, FilterIcon, Calendar as CalendarIcon, TicketIcon } from 'lucide-react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { BADGE_VARIANT, BADGE_BY_RESOLUTION_ID } from '@/lib/constants'
import { readableTimestamp, formatToReadable, cn } from '@/lib/utils'
import { TicketType } from '@/lib/definitions'

import { useTickets } from '@/hooks/use-tickets'

const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(9)
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    resolution: ''
  })
  const [date, setDate] = useState<DateRange | undefined>()

  const {
    list,
    loading,
    tickets,
    total,
    listTicketStatuses,
    listTicketPriorities,
    listTicketResolutions,
    ticketStatuses,
    ticketPriorities,
    ticketResolutions
  } = useTickets()

  const filteredTickets = tickets.filter((ticket) => {
    const { status, priority, resolution } = filters
    const ticketCreatedAt = new Date(ticket.created_at)

    return (
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ticket.ticket_statuses?.name.toLowerCase().includes(status.toLowerCase()) &&
      ticket.ticket_priorities?.name.toLowerCase().includes(priority.toLowerCase()) &&
      ticket.ticket_resolutions?.name.toLowerCase().includes(resolution.toLowerCase()) &&
      (!date?.from || ticketCreatedAt >= new Date(date.from)) &&
      (!date?.to || ticketCreatedAt <= new Date(date.to))
    )
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleResetFilters = () => {
    setFilters({ status: '', priority: '', resolution: '' })
    setDate(undefined)
  }

  useEffect(() => {
    list({ type: 'admin', currentPage: currentPage, perPage: itemsPerPage })
    listTicketStatuses()
    listTicketPriorities()
    listTicketResolutions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className='flex flex-1 flex-col gap-6 p-6 md:p-12 mb-[100px]'>
      <section className='w-full mx-auto pb-12 md:pb-16 lg:pb-20 gap-6 flex flex-col'>
        <div className='grid gap-8'>
          <div className='gap-2 flex items-center'>
            <TicketIcon size={20} />
            <h1 className='text-2xl font-bold'>Tickets</h1>
          </div>
        </div>

        <Card className='w-full'>
          <CardHeader>
            <CardDescription>View and filter ticket actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-full flex flex-col gap-6'>
              <div className='flex gap-2'>
                <div className='relative w-full'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className='h-5 w-5 text-muted-foreground' />
                  </div>
                  <Input
                    type='text'
                    placeholder='Search ticket...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10 pr-4 py-2 rounded-md w-full border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary'
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                      <FilterIcon className='h-4 w-4' />
                      <span className='sr-only'>Filters</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className='grid gap-6 p-2'>
                      <div className='grid gap-4'>
                        <Label htmlFor='status-filter'>Status</Label>
                        <Select
                          value={filters.status}
                          onValueChange={(status) => setFilters({ ...filters, status })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Filter by status' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ticketStatuses.map((status) => (
                                <SelectItem key={status.id} value={status.name}>
                                  {formatToReadable(status.slug)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='grid gap-4'>
                        <Label htmlFor='priority-filter'>Priority</Label>
                        <Select
                          value={filters.priority}
                          onValueChange={(priority) => setFilters({ ...filters, priority })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Filter by priority' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ticketPriorities.map((priority) => (
                                <SelectItem key={priority.id} value={priority.name}>
                                  {formatToReadable(priority.slug)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='grid gap-4'>
                        <Label htmlFor='resolution-filter'>Resolution</Label>
                        <Select
                          value={filters.resolution}
                          onValueChange={(resolution) => setFilters({ ...filters, resolution })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Filter by resolution' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ticketResolutions.map((resolution) => (
                                <SelectItem key={resolution.id} value={resolution.name}>
                                  {formatToReadable(resolution.slug)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='grid gap-4'>
                        <Label htmlFor='createdAt-filter'>Created At</Label>
                        <div className='grid gap-2'>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id='date'
                                variant={'outline'}
                                className={cn(
                                  'w-[300px] justify-start text-left font-normal',
                                  !date && 'text-muted-foreground'
                                )}
                              >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {date?.from ? (
                                  date.to ? (
                                    <>
                                      {format(date.from, 'LLL dd, y')} -{' '}
                                      {format(date.to, 'LLL dd, y')}
                                    </>
                                  ) : (
                                    format(date.from, 'LLL dd, y')
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                              <Calendar
                                initialFocus
                                mode='range'
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <Button variant='outline' onClick={handleResetFilters}>
                        Reset filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='overflow-x-auto'>
                <TicketsTable loading={loading} filteredTickets={filteredTickets} />
              </div>
              <div className='flex items-center justify-between mt-6'>
                <TicketsTablePagination
                  indexOfFirstItem={indexOfFirstItem}
                  indexOfLastItem={indexOfLastItem}
                  filteredTickets={filteredTickets}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

const TicketsTable = ({
  loading,
  filteredTickets
}: {
  loading: boolean
  filteredTickets: TicketType[]
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ref</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Resolution</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>#{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
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
                <TableCell>
                  <Badge variant={BADGE_BY_RESOLUTION_ID[ticket.resolution_id] as any}>
                    {ticket.ticket_resolutions?.name}
                  </Badge>
                </TableCell>
                <TableCell>{readableTimestamp(ticket.created_at)}</TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  )
}

const TicketsTablePagination = ({
  indexOfFirstItem,
  indexOfLastItem,
  filteredTickets,
  currentPage,
  totalPages,
  handlePageChange
}: {
  indexOfFirstItem: number
  indexOfLastItem: number
  filteredTickets: TicketType[]
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}) => {
  return (
    <>
      {Array.isArray(filteredTickets) && filteredTickets.length > 0 ? (
        <>
          <div className='text-sm text-muted-foreground'>
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredTickets.length}{' '}
            activities
          </div>
          <Pagination className='justify-end'>
            <PaginationContent>
              <PaginationItem>
                {currentPage !== 1 ? (
                  <PaginationPrevious href='#' onClick={() => handlePageChange(currentPage - 1)} />
                ) : null}
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                {currentPage !== totalPages ? (
                  <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                ) : null}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : null}
    </>
  )
}

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <TableRow key={idx}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <TableCell key={idx}>
              <div className='h-6 w-full rounded-md bg-muted' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default Page
