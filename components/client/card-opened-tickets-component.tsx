import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function CardOpenedTicketsComponent() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Opened Tickets</CardTitle>
        <Link className='text-sm text-gray-500 dark:text-gray-400' href='#'>
          View all
        </Link>
      </CardHeader>
      <CardContent className='h-[100px] overflow-auto'>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 10 }).map((_, idx) => (
            <div className='flex items-center justify-between' key={idx}>
              <div className='flex items-center gap-2'>
                <div className='inline-flex items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400'>
                  Open
                </div>
                <Link className='font-medium' href='#'>
                  #123 Printer not working
                </Link>
              </div>
              <div className='inline-flex items-center gap-2 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'>
                Medium
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
