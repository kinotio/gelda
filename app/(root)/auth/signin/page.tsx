import Link from 'next/link'
import { ChromeIcon, GithubIcon } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function Login() {
  return (
    <div className='flex min-h-[86dvh] items-center justify-center bg-white dark:bg-gray-950'>
      <div className='mx-auto w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
            Or{' '}
            <Link
              href='/auth/signup'
              className='font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              prefetch={false}
            >
              sign up for a new account
            </Link>
          </p>
        </div>
        <form className='space-y-6' action='#' method='POST'>
          <div>
            <Label
              htmlFor='email'
              className='block text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Email address
            </Label>
            <div className='mt-1'>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor='password'
              className='block text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Password
            </Label>
            <div className='mt-1'>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Checkbox
                id='remember-me'
                name='remember-me'
                className='h-4 w-4 rounded text-gray-700 focus:ring-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:checked:bg-gray-700'
              />
              <Label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900 dark:text-gray-300'
              >
                Remember me
              </Label>
            </div>
            <div className='text-sm'>
              <Link
                href='#'
                className='font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                prefetch={false}
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <Button
              type='submit'
              className='flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600'
            >
              Sign in
            </Button>
          </div>
        </form>
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
      </div>
    </div>
  )
}
