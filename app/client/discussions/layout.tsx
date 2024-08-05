import { HistoryIcon } from 'lucide-react'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex h-[84vh] flex-1 flex-col gap-8 pl-4'>
      <div className='grid grid-cols-[400px_1fr] h-full w-full mx-auto overflow-hidden'>
        <SidebarHistory />
        {children}
      </div>
    </div>
  )
}

const SidebarHistory = () => {
  return (
    <div className='border-r border-gray-200 p-6 flex flex-col gap-4'>
      <div className='font-semibold flex items-center gap-2'>
        <HistoryIcon size={20} />
        <h2 className='text-xl font-bold'>Conversation History</h2>
      </div>
      <div className='flex flex-col gap-4 h-[78vh] overflow-y-scroll pr-6'>
        {Array.from({ length: 20 }).map((_, idx) => (
          <SidebarHistoryCard key={idx} />
        ))}
      </div>
    </div>
  )
}

const SidebarHistoryCard = () => {
  return (
    <div className='bg-white rounded-lg p-4 shadow-sm border'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium'>Intern Onboarding</p>
        <p className='text-sm text-gray-500'>2h ago</p>
      </div>
      <p className='text-sm text-gray-500 mt-2'>
        Discussed setting up email, accessing HR resources, and understanding company policies.
      </p>
    </div>
  )
}

export default Layout
