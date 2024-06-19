import Link from 'next/link'
import { FilePenIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function Admin() {
  return (
    <div className='flex min-h-[calc(92vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Manage Users</CardTitle>
            <Link href='#' className='text-sm text-gray-500 dark:text-gray-400' prefetch={false}>
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Avatar>
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='font-medium'>John Doe</div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>Admin</div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Button variant='ghost' size='icon'>
                    <FilePenIcon className='w-4 h-4' />
                    <span className='sr-only'>Edit user</span>
                  </Button>
                  <Button variant='ghost' size='icon'>
                    <TrashIcon className='w-4 h-4' />
                    <span className='sr-only'>Delete user</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Recent Tickets</CardTitle>
            <Link href='#' className='text-sm text-gray-500 dark:text-gray-400' prefetch={false}>
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link href='#' className='font-medium' prefetch={false}>
                      #123
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href='#' className='font-medium' prefetch={false}>
                      Printer not working
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className='inline-flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400'>
                      Open
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='inline-flex items-center gap-2 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'>
                      Medium
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>AI Settings</CardTitle>
            <Link href='#' className='text-sm text-gray-500 dark:text-gray-400' prefetch={false}>
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-medium'>AI Model</div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>GPT-3</div>
                </div>
                <Button variant='ghost' size='icon'>
                  <FilePenIcon className='w-4 h-4' />
                  <span className='sr-only'>Edit AI model</span>
                </Button>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-medium'>API Key</div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>********</div>
                </div>
                <Button variant='ghost' size='icon'>
                  <FilePenIcon className='w-4 h-4' />
                  <span className='sr-only'>Edit API key</span>
                </Button>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-medium'>Response Limit</div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    50 messages per day
                  </div>
                </div>
                <Button variant='ghost' size='icon'>
                  <FilePenIcon className='w-4 h-4' />
                  <span className='sr-only'>Edit response limit</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Open Tickets</CardTitle>
            <Link href='#' className='text-sm text-gray-500 dark:text-gray-400' prefetch={false}>
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='inline-flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400'>
                    Open
                  </div>
                  <Link href='#' className='font-medium' prefetch={false}>
                    #123 Printer not working
                  </Link>
                </div>
                <div className='inline-flex items-center gap-2 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'>
                  Medium
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='inline-flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400'>
                    Open
                  </div>
                  <Link href='#' className='font-medium' prefetch={false}>
                    #125 Software update issue
                  </Link>
                </div>
                <div className='inline-flex items-center gap-2 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'>
                  Medium
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='inline-flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400'>
                    Open
                  </div>
                  <Link href='#' className='font-medium' prefetch={false}>
                    #127 Network connection issue
                  </Link>
                </div>
                <div className='inline-flex items-center gap-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900 dark:text-red-400'>
                  High
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>Closed Tickets</CardTitle>
            <Link href='#' className='text-sm text-gray-500 dark:text-gray-400' prefetch={false}>
              View all
            </Link>
          </CardHeader>
          <CardContent />
        </Card>
      </div>
    </div>
  )
}
