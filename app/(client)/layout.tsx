import type { Metadata } from 'next'

import { UserLayout } from '@/components/layouts/user-layout'

import { PATH } from '@/lib/constants'
import { MenuType } from '@/lib/definitions'

export const metadata: Metadata = { title: 'Gelda | Client' }

const menus = [
  {
    label: 'Overview',
    path: PATH.CLIENT_OVERVIEW,
    icon: 'LayoutDashboard'
  },
  {
    label: 'Tickets',
    path: PATH.CLIENT_TICKETS,
    icon: 'Ticket'
  },
  {
    label: 'Discussions',
    path: PATH.CLIENT_DISCUSSIONS,
    icon: 'MessagesSquare'
  },
  {
    label: 'Activities',
    path: PATH.CLIENT_ACTIVITIES,
    icon: 'Activity'
  },
  {
    label: 'Settings',
    path: PATH.CLIENT_SETTINGS,
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
