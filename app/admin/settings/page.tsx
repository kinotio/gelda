import { Settings } from '@/components/shared/settings'
import { AiSettings } from '@/components/admin/ai-setting'

const Page = () => {
  return (
    <div className='flex min-h-[calc(92vh_-_theme(spacing.16))] flex-1 flex-col gap-8 p-6 md:gap-12 md:p-12'>
      <section className='w-[800px] mx-auto pb-12 md:pb-16 lg:pb-20 px-4 md:px-6'>
        <div className='grid gap-8'>
          <div className='grid gap-2'>
            <h1 className='text-3xl font-bold'>Settings</h1>
          </div>

          <Settings />
          <AiSettings />
        </div>
      </section>
    </div>
  )
}

export default Page
