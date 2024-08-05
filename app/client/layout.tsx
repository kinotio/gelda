import type { Metadata } from 'next'

import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { Navigation } from '@/components/shared/navigation'

import { Toaster } from '@/components/ui/toaster'

import { PATH } from '@/lib/constants'

export const metadata: Metadata = { title: 'Gelda | Client Dashboard' }

const menus = [
  {
    label: 'Dashboard',
    path: PATH.CLIENT,
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
    label: 'Settings',
    path: PATH.CLIENT_SETTINGS,
    icon: 'Settings'
  }
]

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='sticky top-0'>
        <Header />
        <Navigation menus={menus} />
      </div>
      <main>{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default Layout
