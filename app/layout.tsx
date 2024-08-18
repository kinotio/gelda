import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

import { ThemeProvider } from '@/components/shared/theme-provider'

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
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className='flex items-center justify-center mt-[100px]'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default Layout
