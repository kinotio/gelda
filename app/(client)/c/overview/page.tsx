import { Create } from '@/components/modules/client/overview/create'
import { Recents } from '@/components/modules/client/overview/recents'
import { Discussion } from '@/components/modules/client/overview/discussion'

const Page = () => {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
      <div className='grid gap-4 lg:grid-cols-3 h-full'>
        <Create />
        <Recents />
        <Discussion />
      </div>
    </div>
  )
}

export default Page
