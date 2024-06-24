'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BellIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import HeaderAvatarComponent from '@/components/shared/header-avatar-component'
import { PATH } from '@/lib/constants'

export default function HeaderComponent() {
  return (
    <header className='bg-white text-gray-900 py-4 px-6 flex items-center justify-between'>
      <Link href={PATH.HOME}>
        <Image src='/images/gelda-black.png' alt='Gelda' width={90} height={90} />
      </Link>

      <div className='flex items-center gap-4'>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <BellIcon />
        </Button>

        <HeaderAvatarComponent />
      </div>
    </header>
  )
}
