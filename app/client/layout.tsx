import type { Metadata } from 'next'

import { HeaderComponent } from '@/components/shared/header-component'
import { Footercomponent } from '@/components/shared/footer-component'

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
    </div>
  )
}

export default Layout
