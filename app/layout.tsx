import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '400', '700'],
  display: 'swap'
})

export const metadata: Metadata = { title: 'Gelda' }

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
