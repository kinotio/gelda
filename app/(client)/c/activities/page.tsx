'use client'

import { useState } from 'react'
import { ActivityIcon, SearchIcon, FilterIcon } from 'lucide-react'

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

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    type: '',
    timestamp: ''
  })

  const activityLogs = [
    {
      id: 1,
      type: 'Login',
      timestamp: '2023-04-15 10:30:00',
      description: 'User logged in to the system'
    },
    {
      id: 2,
      type: 'File Upload',
      timestamp: '2023-04-16 14:20:00',
      description: 'User uploaded a new file to the system'
    },
    {
      id: 3,
      type: 'Order Placed',
      timestamp: '2023-04-17 09:45:00',
      description: 'User placed a new order'
    },
    {
      id: 4,
      type: 'Password Change',
      timestamp: '2023-04-18 16:10:00',
      description: 'User changed their password'
    },
    {
      id: 5,
      type: 'Payment Received',
      timestamp: '2023-04-19 11:00:00',
      description: 'Payment received for an order'
    },
    {
      id: 6,
      type: 'Account Created',
      timestamp: '2023-04-20 13:25:00',
      description: 'New user account created'
    },
    {
      id: 7,
      type: 'Order Cancelled',
      timestamp: '2023-04-21 08:35:00',
      description: 'User cancelled an order'
    },
    {
      id: 8,
      type: 'File Download',
      timestamp: '2023-04-22 15:50:00',
      description: 'User downloaded a file from the system'
    },
    {
      id: 9,
      type: 'Email Sent',
      timestamp: '2023-04-23 12:15:00',
      description: 'System sent an email to a user'
    },
    {
      id: 10,
      type: 'Account Deactivated',
      timestamp: '2023-04-24 18:40:00',
      description: 'User account deactivated'
    },
    {
      id: 11,
      type: 'Payment Refunded',
      timestamp: '2023-04-25 14:05:00',
      description: 'Payment refunded for an order'
    },
    {
      id: 12,
      type: 'User Invited',
      timestamp: '2023-04-26 10:00:00',
      description: 'User invited to the system'
    }
  ]

  const filteredLogs = activityLogs.filter((log) => {
    const { type, timestamp } = filters

    return (
      log.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
      log.type.toLowerCase().includes(type.toLowerCase()) &&
      log.timestamp.toLowerCase().includes(timestamp.toLowerCase())
    )
  })
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

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
                  <DropdownMenuContent align='end' className='w-[300px]'>
                    <DropdownMenuLabel>Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className='grid gap-6 p-2'>
                      <div className='grid gap-4'>
                        <Label htmlFor='type-filter'>Type</Label>
                        <Input
                          id='type-filter'
                          type='text'
                          placeholder='Filter by type'
                          value={filters.type}
                          onChange={(e) =>
                            setFilters((prev) => ({ ...prev, type: e.target.value }))
                          }
                        />
                      </div>
                      <div className='grid gap-4'>
                        <Label htmlFor='timestamp-filter'>Timestamp</Label>
                        <Input
                          id='timestamp-filter'
                          type='text'
                          placeholder='Filter by timestamp'
                          value={filters.timestamp}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              timestamp: e.target.value
                            }))
                          }
                        />
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity Type</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.type}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className='flex items-center justify-between mt-6'>
                <div className='text-sm text-muted-foreground'>
                  Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredLogs.length} logs
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {currentPage !== 1 ? (
                        <PaginationPrevious
                          href='#'
                          onClick={() => handlePageChange(currentPage - 1)}
                        />
                      ) : null}
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href='#'
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      {currentPage !== totalPages ? (
                        <PaginationNext
                          href='#'
                          onClick={() => handlePageChange(currentPage + 1)}
                        />
                      ) : null}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default Page
