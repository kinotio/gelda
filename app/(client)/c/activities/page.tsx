'use client'

import { useState, useEffect } from 'react'
import { ActivityIcon, SearchIcon, FilterIcon, Calendar as CalendarIcon, icons } from 'lucide-react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
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
import { Icon } from '@/components/ui/icon'

import { readableTimestamp, formatToReadable, cn } from '@/lib/utils'
import { ACTIVITIES_TYPES } from '@/lib/constants'
import { ActivityType } from '@/lib/definitions'

import { useActivities } from '@/hooks/use-activities'

const deviceIcons = {
  desktop: 'Laptop',
  mobile: 'Smartphone'
}

const Page = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(6)
  const [filters, setFilters] = useState({
    type: ''
  })
  const [date, setDate] = useState<DateRange | undefined>()

  const { list, loading, activities, total } = useActivities()

  const filteredActivities = activities.filter((activity) => {
    const { type } = filters
    const logTimestamp = new Date(activity.timestamp)
    return (
      activity.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
      activity.type.toLowerCase().includes(type.toLowerCase()) &&
      (!date?.from || logTimestamp >= new Date(date.from)) &&
      (!date?.to || logTimestamp <= new Date(date.to))
    )
  })
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleResetFilters = () => {
    setFilters({ type: '' })
    setDate(undefined)
  }

  useEffect(() => {
    list({ currentPage: currentPage, perPage: itemsPerPage })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className='flex flex-1 flex-col gap-8 p-6 md:gap-12 md:p-12'>
      <section className='w-[800px] mx-auto pb-12 md:pb-16 lg:pb-20 px-4 md:px-6 gap-6 flex flex-col'>
        <div className='grid gap-8'>
          <div className='gap-2 flex items-center'>
            <ActivityIcon size={20} />
            <h1 className='text-3xl font-bold'>Activities</h1>
          </div>
        </div>

        <Card className='w-full'>
          <CardHeader>
            <CardDescription>View and filter activity actions</CardDescription>
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
                    placeholder='Search activity logs...'
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
                        <Label htmlFor='type-filter'>Type</Label>
                        <Select
                          value={filters.type}
                          onValueChange={(type) => setFilters({ ...filters, type })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Filter by type' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {ACTIVITIES_TYPES.map((type: string) => (
                                <SelectItem key={type} value={type}>
                                  {formatToReadable(type)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='grid gap-4'>
                        <Label htmlFor='timestamp-filter'>Timestamp</Label>
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
                <ActivitiesTable loading={loading} filteredActivities={filteredActivities} />
              </div>
              <div className='flex items-center justify-between mt-6'>
                <ActivitiesTablePagination
                  indexOfFirstItem={indexOfFirstItem}
                  indexOfLastItem={indexOfLastItem}
                  filteredActivities={filteredActivities}
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

const ActivitiesTable = ({
  loading,
  filteredActivities
}: {
  loading: boolean
  filteredActivities: ActivityType[]
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Activity Type</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Device</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{formatToReadable(activity.type)}</TableCell>
                <TableCell>{readableTimestamp(activity.timestamp)}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>
                  <Icon name={deviceIcons[activity.device] as keyof typeof icons} size={20} />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  )
}

const ActivitiesTablePagination = ({
  indexOfFirstItem,
  indexOfLastItem,
  filteredActivities,
  currentPage,
  totalPages,
  handlePageChange
}: {
  indexOfFirstItem: number
  indexOfLastItem: number
  filteredActivities: ActivityType[]
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}) => {
  return (
    <>
      <div className='text-sm text-muted-foreground'>
        Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredActivities.length}{' '}
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
  )
}

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <TableRow key={idx}>
          {Array.from({ length: 3 }).map((_, idx) => (
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
