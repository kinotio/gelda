import type { Metadata } from 'next'

import { UserLayout } from '@/components/layouts/user-layout'

import { PATH } from '@/lib/constants'
import { MenuType } from '@/lib/definitions'

export const metadata: Metadata = { title: 'Gelda | Admin' }

const menus = [
  {
    label: 'Dashboard',
    path: PATH.ADMIN_DASHBOARD,
    icon: 'LayoutDashboard'
  },
  {
    label: 'Users',
    path: PATH.ADMIN_USERS,
    icon: 'Users'
  },
  {
    label: 'Tickets',
    path: PATH.ADMIN_TICKETS,
    icon: 'Ticket'
  },
  {
    label: 'AI Configurations',
    path: PATH.ADMIN_AI,
    icon: 'BotMessageSquare'
  },
  {
    label: 'Activities',
    path: PATH.ADMIN_ACTIVITIES,
    icon: 'Activity'
  },
  {
    label: 'Settings',
    path: PATH.ADMIN_SETTINGS,
    icon: 'Settings'
  }
] as MenuType[]

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <UserLayout menus={menus}>{children}</UserLayout>
}

export default SubLayout
