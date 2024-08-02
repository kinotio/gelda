'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BellIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/shared/avatar'

import { PATH } from '@/lib/constants'

const Header = () => {
  return (
    <header className='pt-4 pb-2 px-6 flex items-center justify-between bg-white'>
      <Link href={PATH.HOME}>
        <Image src='/images/gelda-black.png' alt='Gelda' width={90} height={90} priority />
      </Link>

      <div className='flex items-center gap-4'>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <BellIcon />
        </Button>

        <Avatar />
      </div>
    </header>
  )
}

export { Header }
