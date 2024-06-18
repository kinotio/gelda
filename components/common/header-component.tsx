import Link from 'next/link'
import Image from 'next/image'
import { BellIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import HeaderAvatarComponent from '@/components/common/header-avatar-component'

export default function HeaderComponent() {
  return (
    <header className='flex items-center h-16 px-4 shrink-0 md:px-6'>
      <nav className='flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link href='/'>
          <Image src='/images/gelda-black.png' alt='Gelda' width={90} height={90} />
        </Link>
      </nav>
      <div className='flex w-full justify-end items-center gap-2'>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <BellIcon />
        </Button>

        <HeaderAvatarComponent />
      </div>
    </header>
  )
}
