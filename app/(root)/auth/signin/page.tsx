import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Gelda | Sign In' }

import { SigninForm } from '@/components/root/auth/signin-form'

const Page = () => {
  return (
    <div className='flex min-h-[calc(95vh_-_theme(spacing.16))] items-center justify-center bg-white dark:bg-gray-950'>
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
        <SigninForm />
      </div>
    </div>
  )
}

export default Page
