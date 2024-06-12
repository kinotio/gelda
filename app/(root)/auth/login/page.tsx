import Link from 'next/link'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <section className='w-full pt-12 md:pt-24 lg:pt-32 border-y min-h-[87dvh]'>
      <div className='px-4 md:px-6 space-y-10 xl:space-y-16'>
        <div className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 items-center'>
          <div className='hidden md:block'>
            <h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
              Login for Gelda
            </h1>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 pt-6'>
              Sign in for our AI-powered helpdesk platform and start providing effortless customer
              support.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <form className='mt-6 space-y-4 w-full max-w-md'>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' placeholder='Enter your email' type='email' />
              </div>
              <div>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' placeholder='Enter a password' type='password' />
              </div>
              <Button className='w-full' type='submit'>
                Login
              </Button>
            </form>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>
              Don&apos;t have an account?
              <Link className='text-blue-500 hover:underline ml-2' href='/auth/register'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
