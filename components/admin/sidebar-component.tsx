'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { UsersIcon, TicketIcon, SettingsIcon, BotIcon, BarChartBigIcon } from 'lucide-react'

import { PATH } from '@/lib/constants'

export default function SidebarComponent() {
  const pathname = usePathname()

  return (
    <nav className='w-[250px] overflow-auto px-4 py-6 border-r border-t border-b border-gray-200 rounded-r-2xl'>
      <ul className='space-y-1'>
        <li>
          <Link
            href={PATH.HOME}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${PATH.ADMIN_DASHBOARD === pathname ? 'bg-gray-900 text-white' : 'hover:bg-gray-900 hover:text-white'}`}
            prefetch={false}
          >
            <BarChartBigIcon className='h-5 w-5' />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href={PATH.ADMIN_USERS}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${PATH.ADMIN_USERS === pathname ? 'bg-gray-900 text-white' : 'hover:bg-gray-900 hover:text-white'}`}
            prefetch={false}
          >
            <UsersIcon className='h-5 w-5' />
            Users
          </Link>
        </li>
        <li>
          <Link
            href={PATH.ADMIN_TICKETS}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${PATH.ADMIN_TICKETS === pathname ? 'bg-gray-900 text-white' : 'hover:bg-gray-900 hover:text-white'}`}
            prefetch={false}
          >
            <TicketIcon className='h-5 w-5' />
            Tickets
          </Link>
        </li>
        <li>
          <Link
            href={PATH.ADMIN_AI}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${PATH.ADMIN_AI === pathname ? 'bg-gray-900 text-white' : 'hover:bg-gray-900 hover:text-white'}`}
            prefetch={false}
          >
            <BotIcon className='h-5 w-5' />
            AI
          </Link>
        </li>
        <li>
          <Link
            href={PATH.ADMIN_SETTINGS}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${PATH.ADMIN_SETTINGS === pathname ? 'bg-gray-900 text-white' : 'hover:bg-gray-900 hover:text-white'}`}
            prefetch={false}
          >
            <SettingsIcon className='h-5 w-5' />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  )
}
