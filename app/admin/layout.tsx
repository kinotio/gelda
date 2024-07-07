import type { Metadata } from 'next'

import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

import { FloatingMenu } from '@/components/shared/floating-menu'

import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = { title: 'Gelda | Admin Dashboard' }

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      {children}
      <Footer />
      <FloatingMenu />
      <Toaster />
    </div>
  )
}

export default Layout
