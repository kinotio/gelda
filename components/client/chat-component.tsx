import {
  ClipboardIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  RefreshCcwIcon,
  ArrowUpIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

import { APP_VERSION } from '@/utils/constants'

export default function ChatComponent() {
  return (
    <div className='flex flex-col'>
      <div className='sticky top-0 p-2'>
        <Badge className='gap-2'>{`v${APP_VERSION}`}</Badge>
      </div>
      <div className='max-w-2xl flex-1 mx-auto flex flex-col items-start gap-8 px-4'>
        <div className='flex items-start gap-4'>
          <Avatar className='border w-6 h-6'>
            <AvatarImage alt='Image' src='/placeholder-user.jpg' />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <div className='font-bold'>You</div>
            <div className='prose prose-stone'>
              <p>
                Can you explain airplane turbulence to someone who has never flown before? Make it
                conversational and concise.
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-start gap-4'>
          <Avatar className='border w-6 h-6'>
            <AvatarImage alt='Image' src='/placeholder-user.jpg' />
            <AvatarFallback>OA</AvatarFallback>
          </Avatar>
          <div className='grid gap-1'>
            <div className='font-bold'>Gelda</div>
            <div className='prose prose-stone'>
              <p>
                Of course! Imagine you re in a car driving down a bumpy road, and the ride isn t
                perfectly smooth. Sometimes, you hit small potholes or bumps, right? Well, when you
                re in an airplane, it s kind of like that, but in the sky.
              </p>
            </div>
            <div className='flex items-center gap-2 py-2'>
              <Button
                className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                size='icon'
                variant='ghost'
              >
                <ClipboardIcon className='w-4 h-4' />
                <span className='sr-only'>Copy</span>
              </Button>
              <Button
                className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                size='icon'
                variant='ghost'
              >
                <ThumbsUpIcon className='w-4 h-4' />
                <span className='sr-only'>Upvote</span>
              </Button>
              <Button
                className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                size='icon'
                variant='ghost'
              >
                <ThumbsDownIcon className='w-4 h-4' />
                <span className='sr-only'>Downvote</span>
              </Button>
              <Button
                className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                size='icon'
                variant='ghost'
              >
                <RefreshCcwIcon className='w-4 h-4' />
                <span className='sr-only'>Regenerate</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-2xl w-full sticky bottom-0 mx-auto py-2 flex flex-col gap-1.5 px-4 bg-white dark:bg-gray-950'>
        <div className='relative'>
          <Textarea
            className='min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16 dark:border-gray-800'
            id='message'
            name='message'
            placeholder='Message Gelda...'
            rows={1}
          />
          <Button className='absolute top-3 right-3 w-8 h-8' size='icon' type='submit'>
            <ArrowUpIcon className='w-4 h-4' />
            <span className='sr-only'>Send</span>
          </Button>
        </div>
        <p className='text-xs text-center text-neutral-700 font-medium'>
          Gelda can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  )
}
