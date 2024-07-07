import type { Metadata } from 'next'

import { HeaderComponent } from '@/components/shared/header'
import { Footercomponent } from '@/components/shared/footer'

import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = { title: 'Gelda | Client Dashboard' }

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <HeaderComponent />
      {children}
      <Footercomponent />
      <Toaster />
    </div>
  )
}

export default Layout
