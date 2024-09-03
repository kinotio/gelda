'use client'

import { useEffect, useState } from 'react'
import { SearchIcon, FilterIcon, Calendar as CalendarIcon, UsersIcon } from 'lucide-react'
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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { BADGE_VARIANT, BADGE_BY_RESOLUTION_ID } from '@/lib/constants'
import { readableTimestamp, formatToReadable, cn } from '@/lib/utils'
import { UserType } from '@/lib/definitions'

import { useUsers } from '@/hooks/use-users'

const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(9)
  const [filters, setFilters] = useState({
    name: '',
    username: '',
    email: ''
  })
  const [date, setDate] = useState<DateRange | undefined>()

  const { list, loading, users, total } = useUsers()

  const filteredUsers = users.filter((user) => {
    const { name, username, email } = filters
    const ticketCreatedAt = new Date(user.created_at)

    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!date?.from || ticketCreatedAt >= new Date(date.from)) &&
      (!date?.to || ticketCreatedAt <= new Date(date.to))
    )
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleResetFilters = () => {
    setFilters({ name: '', username: '', email: '' })
    setDate(undefined)
  }

  useEffect(() => {
    list({ currentPage: currentPage, perPage: itemsPerPage })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className='flex flex-1 flex-col gap-6 p-6 md:p-12 mb-[100px]'>
      <section className='w-full mx-auto pb-12 md:pb-16 lg:pb-20 gap-6 flex flex-col'>
        <div className='grid gap-8'>
          <div className='gap-2 flex items-center'>
            <UsersIcon size={20} />
            <h1 className='text-2xl font-bold'>Users</h1>
          </div>
        </div>

        <Card className='w-full'>
          <CardHeader>
            <CardDescription>View and filter user actions</CardDescription>
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
                    placeholder='Search user...'
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
                        <Label htmlFor='createdAt-filter'>Joined At</Label>
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
                <TicketsTable loading={loading} filteredUsers={filteredUsers} />
              </div>
              <div className='flex items-center justify-between mt-6'>
                <TicketsTablePagination
                  indexOfFirstItem={indexOfFirstItem}
                  indexOfLastItem={indexOfLastItem}
                  filteredUsers={filteredUsers}
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
  filteredUsers
}: {
  loading: boolean
  filteredUsers: UserType[]
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Joined At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{readableTimestamp(user.created_at)}</TableCell>
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
  filteredUsers,
  currentPage,
  totalPages,
  handlePageChange
}: {
  indexOfFirstItem: number
  indexOfLastItem: number
  filteredUsers: UserType[]
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}) => {
  return (
    <>
      {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
        <>
          <div className='text-sm text-muted-foreground'>
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredUsers.length} activities
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
