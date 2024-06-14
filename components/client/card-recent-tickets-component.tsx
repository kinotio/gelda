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

export default function CardRecentTicketsComponent() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Recent Tickets</CardTitle>
        <Link className='text-sm text-gray-500 dark:text-gray-400' href='#'>
          View all
        </Link>
      </CardHeader>
      <CardContent className='h-[500px] overflow-auto'>
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
            {Array.from({ length: 10 }).map((data, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Link className='font-medium' href='#'>
                    #123
                  </Link>
                </TableCell>
                <TableCell>
                  <Link className='font-medium' href='#'>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
