import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '400', '700'],
  display: 'swap'
})

export const metadata: Metadata = { title: 'Gelda' }

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default Layout
