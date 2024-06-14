import Link from 'next/link'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function CardClosedTicketsComponent() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Closed Tickets</CardTitle>
        <Link className='text-sm text-gray-500 dark:text-gray-400' href='#'>
          View all
        </Link>
      </CardHeader>
      <CardContent className='h-[100px] overflow-auto'>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 10 }).map((_, idx) => (
            <div className='flex items-center justify-between' key={idx}>
              <div className='flex items-center gap-2'>
                <div className='inline-flex items-center gap-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900 dark:text-red-400'>
                  Closed
                </div>
                <Link className='font-medium' href='#'>
                  #124 Can t access email
                </Link>
              </div>
              <div className='inline-flex items-center gap-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900 dark:text-red-400'>
                High
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
