'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TicketIcon, SettingsIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react'

import { PATH } from '@/lib/constants'

export default function FloatingMenuComponent() {
  const pathname = usePathname()

  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 bg-background rounded-full shadow-lg p-5 flex items-center gap-4'>
      <Link
        href={PATH.ADMIN_DASHBOARD}
        className={`flex items-center gap-2 hover:underline p-2 rounded-full ${
          pathname === PATH.ADMIN_DASHBOARD ? 'text-white bg-gray-950' : 'text-gray-500'
        }`}
        prefetch={false}
      >
        <LayoutDashboardIcon className='w-6 h-6' />
      </Link>

      <Link
        href={PATH.ADMIN_USERS}
        className={`flex items-center gap-2 hover:underline p-2 rounded-full ${
          pathname === PATH.ADMIN_USERS ? 'text-white bg-gray-950' : 'text-gray-500'
        }`}
        prefetch={false}
      >
        <UsersIcon className='w-6 h-6' />
      </Link>

      <Link
        href={PATH.ADMIN_TICKETS}
        className={`flex items-center gap-2 hover:underline p-2 rounded-full ${
          pathname === PATH.ADMIN_TICKETS ? 'text-white bg-gray-950' : 'text-gray-500'
        }`}
        prefetch={false}
      >
        <TicketIcon className='w-6 h-6' />
      </Link>

      <Link
        href={PATH.ADMIN_SETTINGS}
        className={`disabled pointer-events-none flex items-center gap-2 hover:underline p-2 rounded-full ${
          pathname === PATH.ADMIN_SETTINGS ? 'text-white bg-gray-950' : 'text-gray-500'
        }`}
        prefetch={false}
      >
        <SettingsIcon className='w-6 h-6' />
      </Link>
    </div>
  )
}
