import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/toaster'

import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { Navigation } from '@/components/shared/navigation'

import { PATH } from '@/lib/constants'

export const metadata: Metadata = { title: 'Gelda | Admin Dashboard' }

const menus = [
  {
    label: 'Dashboard',
    path: PATH.ADMIN_DASHBOARD
  },
  {
    label: 'Users',
    path: PATH.ADMIN_USERS
  },
  {
    label: 'Tickets',
    path: PATH.ADMIN_TICKETS
  },
  {
    label: 'Settings',
    path: PATH.ADMIN_SETTINGS
  }
]

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='sticky top-0 w-full'>
        <Header />
        <Navigation menus={menus} />
      </div>
      <main className='w-[75vw] mx-auto'>{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default Layout
