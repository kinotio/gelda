import type { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'
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
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      <div className='w-full'>
        <Navigation menus={menus} />
      </div>
      <Separator />
      <main className='w-[75vw] mx-auto'>{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default Layout
