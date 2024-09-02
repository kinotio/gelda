import { SettingsIcon } from 'lucide-react'

import { Settings } from '@/components/shared/settings'

const Page = () => {
  return (
    <div className='flex flex-1 flex-col gap-8 p-6 md:gap-12 md:p-12 mb-[100px]'>
      <section className='w-[800px] mx-auto pb-12 md:pb-16 lg:pb-20 px-4 md:px-6'>
        <div className='grid gap-8'>
          <div className='gap-2 flex items-center'>
            <SettingsIcon size={20} />
            <h1 className='text-3xl font-bold'>Settings</h1>
          </div>

          <Settings />
        </div>
      </section>
    </div>
  )
}

export default Page
