'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { TicketIcon, SettingsIcon, BellIcon, LayoutDashboardIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import HeaderAvatarComponent from '@/components/common/header-avatar-component'
import { PATH } from '@/lib/constants'

export default function HeaderComponent() {
  const pathname = usePathname()

  return (
    <header className='bg-white text-gray-900 py-4 px-6 flex items-center justify-between'>
      <Link href={PATH.HOME}>
        <Image src='/images/gelda-black.png' alt='Gelda' width={90} height={90} />
      </Link>

      <nav className='flex items-center gap-6'>
        <Link
          href={PATH.ADMIN_DASHBOARD}
          className={`flex items-center gap-2 hover:underline ${
            pathname === PATH.ADMIN_DASHBOARD ? 'text-primary' : 'text-gray-500'
          }`}
          prefetch={false}
        >
          <LayoutDashboardIcon className='w-5 h-5' />
          <span>Dashboard</span>
        </Link>
        <Link
          href={PATH.ADMIN_TICKETS}
          className={`flex items-center gap-2 hover:underline ${
            pathname === PATH.ADMIN_TICKETS ? 'text-primary' : 'text-gray-500'
          }`}
          prefetch={false}
        >
          <TicketIcon className='w-5 h-5' />
          <span>Tickets</span>
        </Link>
        <Link
          href={PATH.ADMIN_SETTINGS}
          className={`flex items-center gap-2 hover:underline ${
            pathname === PATH.ADMIN_SETTINGS ? 'text-primary' : 'text-gray-500'
          }`}
          prefetch={false}
        >
          <SettingsIcon className='w-5 h-5' />
          <span>Settings</span>
        </Link>
      </nav>

      <div className='flex items-center gap-4'>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <BellIcon />
        </Button>

        <HeaderAvatarComponent />
      </div>
    </header>
  )
}
