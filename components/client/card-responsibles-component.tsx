import Link from 'next/link'
import { EyeIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function CardResponsiblesComponent() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Responsibles</CardTitle>
        <Link className='text-sm text-gray-500 dark:text-gray-400' href='#'>
          View all
        </Link>
      </CardHeader>
      <CardContent className='h-[100px] overflow-auto'>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div className='flex items-center justify-between' key={idx}>
              <div className='flex items-center gap-2'>
                <div className='inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium '>
                  <Avatar>
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                </div>
                <Link className='font-medium' href='#'>
                  John Doe
                </Link>
              </div>
              <div className='flex gap-4'>
                <EyeIcon />
                <Badge variant='secondary'>14-04-2024</Badge>
                <Badge>12h00</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
