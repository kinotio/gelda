import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      <main className='flex min-h-[calc(92vh_-_theme(spacing.16))] items-center justify-center'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default SubLayout
