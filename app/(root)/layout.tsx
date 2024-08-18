import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

import { ThemeProvider } from '@/components/shared/theme-provider'

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <Header />
      <main className='flex items-center justify-center mt-[100px]'>{children}</main>
      <Footer />
    </ThemeProvider>
  )
}

export default SubLayout
