import type { Metadata } from 'next'

import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = { title: 'Gelda | Client Dashboard' }

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      <main className='w-[75vw] h-full mx-auto'>{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default Layout
