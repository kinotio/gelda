import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/shared/theme-provider'

import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

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
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default Layout
