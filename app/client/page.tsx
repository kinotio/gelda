import { CreateTicket } from '@/components/client/create-ticket'
import { Discussion } from '@/components/client/discussion'
import { RecentTickets } from '@/components/client/recent-tickets'

const Page = () => {
  return (
    <div className='flex h-[84vh] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
      <div className='grid gap-4 lg:grid-cols-3 h-full'>
        <CreateTicket />
        <RecentTickets />
        <Discussion />
      </div>
    </div>
  )
}

export default Page
