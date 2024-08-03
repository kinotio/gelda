import Link from 'next/link'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='flex h-[84vh] flex-1 flex-col gap-8 pl-4'>
      <div className='grid grid-cols-[300px_1fr] h-full w-full mx-auto overflow-hidden'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className='border-r border-gray-200 p-6 flex flex-col gap-4'>
      <div className='flex flex-col gap-4 overflow-y-scroll pr-6'>
        <div className='flex-1 overflow-auto'>
          <div className='grid items-start px-4 text-sm font-medium'>
            <Collapsible className='grid'>
              <CollapsibleTrigger
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              >
                <div className='flex items-center gap-3'>Status</div>
              </CollapsibleTrigger>
              <CollapsibleContent className='grid px-4 overflow-auto'>
                <Link
                  href={'#'}
                  className={`ml-6 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 `}
                >
                  Open
                </Link>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className='grid'>
              <CollapsibleTrigger
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              >
                <div className='flex items-center gap-3'>Priority</div>
              </CollapsibleTrigger>
              <CollapsibleContent className='grid px-4 overflow-auto'>
                <Link
                  href={'#'}
                  className={`ml-6 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 `}
                >
                  Low
                </Link>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className='grid'>
              <CollapsibleTrigger
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              >
                <div className='flex items-center gap-3'>Resolution</div>
              </CollapsibleTrigger>
              <CollapsibleContent className='grid px-4 overflow-auto'>
                <Link
                  href={'#'}
                  className={`ml-6 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 `}
                >
                  Resolved
                </Link>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
