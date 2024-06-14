import Link from 'next/link'
import Image from 'next/image'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function SidebarComponent() {
  return (
    <div className='bg-neutral-950 hidden md:flex flex-col gap-2 text-white'>
      <div className='sticky top-0 p-4'>
        <Link href='/'>
          <Image src='/images/gelda-white.png' width={100} height={100} alt='Gelda Logo' />
        </Link>
      </div>
      <div className='overflow-auto flex-1'>
        <div className='grid gap-1 p-2'>
          <div className='text-stone-500 text-xs font-medium px-2'>Histories</div>
          <Link
            className='truncate overflow-hidden flex-1 text-sm transition-colors rounded-md whitespace-nowrap p-2 block hover:bg-neutral-900 hover:text-neutral-50'
            href='#'
          >
            How to make a chat app with React
          </Link>
        </div>
      </div>
      <div className='mt-auto p-4 border-t border-neutral-800'>
        <div className='flex items-center gap-4'>
          <Avatar className='border w-10 h-10'>
            <AvatarImage alt='Image' src='/placeholder-user.jpg' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <div className='font-medium'>John Doe</div>
            <div className='text-stone-500 text-sm'>Helpdesk Agent</div>
          </div>
        </div>
      </div>
    </div>
  )
}
