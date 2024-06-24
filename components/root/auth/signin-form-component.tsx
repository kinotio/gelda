'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EyeIcon, EyeOffIcon, AlertCircle } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useSignin } from '@/hooks/auth/use-signin'
import { AuthSignInFormType } from '@/lib/definitions'

export default function SigninFormComponent() {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthSignInFormType>()
  const { loading, signIn, message, success } = useSignin()

  const onSubmit: SubmitHandler<AuthSignInFormType> = async (form: AuthSignInFormType) =>
    await signIn(form)

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      {!success && message !== '' ? (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}

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
            type='email'
            placeholder='john.doe@example.com'
            className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
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
          <div className='relative'>
            <Input
              id='password'
              type={passwordVisibility ? 'text' : 'password'}
              placeholder='****************'
              className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
              {...register('password', {
                required: 'Password is required'
              })}
            />
            <Button
              variant='ghost'
              size='icon'
              type='button'
              className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              {passwordVisibility ? (
                <EyeOffIcon className='h-4 w-4' />
              ) : (
                <EyeIcon className='h-4 w-4' />
              )}

              <span className='sr-only'>Toggle password visibility</span>
            </Button>
          </div>

          {errors.password && (
            <span className='text-red-500 text-sm'>{errors.password.message}</span>
          )}
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
          {loading ? 'Loading...' : 'Sign in'}
        </Button>
      </div>
    </form>
  )
}
