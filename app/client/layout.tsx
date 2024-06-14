import HeaderComponent from '@/components/common/header-component'
import Footercomponent from '@/components/common/footer-component'

export default function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <HeaderComponent />
      {children}
      <Footercomponent />
    </div>
  )
}
