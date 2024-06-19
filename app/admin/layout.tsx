import HeaderComponent from '@/components/common/header-component'
import Footercomponent from '@/components/common/footer-component'
import SidebarComponent from '@/components/admin/sidebar-component'

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col w-full min-h-screen'>
      <HeaderComponent />
      <div className='flex'>
        <SidebarComponent />
        <div className='flex-1'>{children}</div>
      </div>

      <Footercomponent />
    </div>
  )
}
