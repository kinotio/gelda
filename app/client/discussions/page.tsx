import { SendIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div className='w-full h-[84vh] bg-white flex flex-col'>
      <div className='flex-1 overflow-y-scroll p-4 space-y-4 h-[75vh]'>
        <div className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-gray-100'>
          <p>{`Hi, how can I help you today?`}</p>
          <p className='text-xs text-gray-500'>Gelda AI</p>
        </div>
        {Array.from({ length: 20 }).map((_, idx) => (
          <div
            key={idx}
            className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-gray-900 text-gray-50'
          >
            <p>{`I'm having trouble accessing the HR portal, can you help me?`}</p>
            <p className='text-xs text-gray-500 '>You</p>
          </div>
        ))}
      </div>
      <div className='border-t border-gray-200 p-4 w-full'>
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

export default Page
