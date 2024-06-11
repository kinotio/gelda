import Link from 'next/link'
import { HeadphonesIcon, TicketIcon, InfoIcon } from 'lucide-react'

export default function AboutComponent() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container space-y-12 px-4 md:px-6'>
        <div className='mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3'>
          <div className='grid gap-1'>
            <HeadphonesIcon className='h-8 w-8 text-gray-500 dark:text-gray-400' />
            <h3 className='text-lg font-bold'>Instant Responses</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Our AI-powered chatbot provides instant responses to customer inquiries, reducing wait
              times and improving satisfaction.
            </p>
          </div>
          <div className='grid gap-1'>
            <TicketIcon className='h-8 w-8 text-gray-500 dark:text-gray-400' />
            <h3 className='text-lg font-bold'>Automated Ticket Handling</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Streamline your support workflow with automated ticket creation, prioritization, and
              assignment, ensuring no customer issue falls through the cracks.
            </p>
          </div>
          <div className='grid gap-1'>
            <InfoIcon className='h-8 w-8 text-gray-500 dark:text-gray-400' />
            <h3 className='text-lg font-bold'>Insightful Analytics</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Gain valuable insights into your customer support performance with comprehensive
              analytics, helping you identify areas for improvement and optimize your operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
