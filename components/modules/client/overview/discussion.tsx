import { PlusIcon, SendIcon, MessagesSquareIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// import { useAi } from '@/hooks/shared/use-ai'

const Discussion = () => {
  // const { content } = useAi()

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium flex items-center gap-2'>
          <MessagesSquareIcon size={20} />
          <span className='text-xl font-bold'>Gelda</span>
        </CardTitle>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <PlusIcon className='w-4 h-4' />
          <span className='sr-only'>New Discussion</span>
        </Button>
      </CardHeader>
      <CardContent className='h-[600px] overflow-y-scroll'>
        <div className='space-y-4'>
          <div className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900'>
            Hi
          </div>
          <div className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800'>
            Hi, how can I assist you today?
          </div>
          {Array.from({ length: 20 }).map((_, idx) => (
            <div
              key={idx}
              className='flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900'
            >
              I m having trouble with my computer. Can you help me?
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex flex-col w-full'>
          <form className='flex w-full items-center space-x-2 pt-4'>
            <Input autoComplete='off' className='flex-1' id='message' placeholder='Ask...' />
            <Button size='icon' type='submit'>
              <SendIcon className='h-4 w-4' />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
          <span className='flex w-full justify-center text-xs pt-2'>
            Gelda can make mistakes. Consider checking important information.
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export { Discussion }
