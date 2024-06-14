import SidebarComponent from '@/components/client/sidebar-component'

export default function ClientLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='grid md:grid-cols-[300px_1fr] min-h-screen w-full'>
      <SidebarComponent />
      {children}
    </div>
  )
}
