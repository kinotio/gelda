'use client'

import { CreateTicket } from '@/components/client/create-ticket'
import { Chat } from '@/components/client/chat'
import { RecentTickets } from '@/components/client/recent-tickets'

import { OpenedTickets } from '@/components/client/opened-tickets'
import { ClosedTickets } from '@/components/client/closed-tickets'
import { Responsibles } from '@/components/client/responsibles'

const Page = () => {
  return (
    <div className='flex min-h-[calc(90vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
      <div className='grid gap-4 lg:grid-cols-3'>
        <CreateTicket />
        <RecentTickets />
        <Chat />
      </div>
      <div className='grid gap-4 lg:grid-cols-3'>
        <OpenedTickets />
        <ClosedTickets />
        <Responsibles />
      </div>
    </div>
  )
}

export default Page
