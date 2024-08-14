import { ChromeIcon, GithubIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

const SocialAuth = () => {
  return (
    <>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-400 dark:border-gray-600' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400'>
            Or continue with
          </span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Button
          variant='outline'
          className='flex w-full justify-center rounded-md border border-gray-400 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-600'
        >
          <GithubIcon className='mr-2 h-5 w-5' />
          GitHub
        </Button>
        <Button
          variant='outline'
          className='flex w-full justify-center rounded-md border border-gray-400 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-600'
        >
          <ChromeIcon className='mr-2 h-5 w-5' />
          Google
        </Button>
      </div>
    </>
  )
}

export { SocialAuth }
