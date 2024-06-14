import CardCreateTicketComponent from '@/components/client/card-create-ticket-component'
import CardChatComponent from '@/components/client/card-chat-component'
import CardRecentTicketsComponent from '@/components/client/card-recent-tickets-component'
import CardOpenedTicketsComponent from '@/components/client/card-opened-tickets-component'
import CardClosedTicketsComponent from '@/components/client/card-closed-tickets-component'
import CardResponsiblesComponent from '@/components/client/card-responsibles-component'

export default function Client() {
  return (
    <div className='flex min-h-[calc(90vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CardCreateTicketComponent />
        <CardRecentTicketsComponent />
        <CardChatComponent />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CardOpenedTicketsComponent />
        <CardClosedTicketsComponent />
        <CardResponsiblesComponent />
      </div>
    </div>
  )
}
