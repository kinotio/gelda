import { SendIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div className='w-full h-[82vh] flex flex-col'>
      <div className='flex-1 overflow-y-scroll p-4 space-y-4'>
        <BotMessage message={`Hi, how can I help you today?`} />
        <UserMessage message={`I'm having trouble accessing the HR portal, can you help me?`} />
      </div>
      <div className='border-t p-4 w-full'>
        <form className='flex items-center space-x-2'>
          <Input id='message' placeholder='Ask...' className='flex-1' autoComplete='off' />
          <Button type='submit' size='icon'>
            <SendIcon className='h-4 w-4' />
            <span className='sr-only'>Send</span>
          </Button>
        </form>
        <span className='flex w-full justify-center text-xs pt-2'>
          Gelda can make mistakes. Consider checking important information.
        </span>
      </div>
    </div>
  )
}

const BotMessage = ({ message }: { message: string }) => {
  return (
    <div className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-gray-100'>
      <p className='text-gray-700'>{message}</p>
      <p className='text-xs text-gray-500'>Gelda AI</p>
    </div>
  )
}

const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-gray-900 text-gray-50'>
      <p>{message}</p>
      <p className='text-xs text-gray-500 '>You</p>
    </div>
  )
}

export default Page
