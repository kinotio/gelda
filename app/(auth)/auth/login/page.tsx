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

import { AuthSignInFormType } from '@/lib/definitions'

const Page = () => {
  return (
    <div className='mx-auto w-full max-w-md space-y-8'>
      <div>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm'>
          Or{' '}
          <Link href='/auth/signup' className='font-medium' prefetch={false}>
            sign up for a new account
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  )
}

const LoginForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthSignInFormType>()

  const loading = false
  const message = ''
  const success = false

  const onSubmit: SubmitHandler<AuthSignInFormType> = async (form: AuthSignInFormType) =>
    console.log(form)

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
        <Label htmlFor='email' className='block text-sm font-medium'>
          Email address
        </Label>
        <div className='mt-1'>
          <Input
            autoComplete='email'
            id='email'
            type='email'
            placeholder='john.doe@example.com'
            className='block w-full appearance-none rounded-md border px-3 py-2 shadow-sm'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
        </div>
      </div>
      <div>
        <Label htmlFor='password' className='block text-sm font-medium'>
          Password
        </Label>
        <div className='mt-1'>
          <div className='relative'>
            <Input
              autoComplete='password'
              id='password'
              type={passwordVisibility ? 'text' : 'password'}
              placeholder='****************'
              className='block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none'
              {...register('password', {
                required: 'Password is required'
              })}
            />
            <Button
              variant='ghost'
              size='icon'
              type='button'
              className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent'
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
          <Checkbox id='remember-me' name='remember-me' className='h-4 w-4 rounded' />
          <Label htmlFor='remember-me' className='ml-2 block text-sm'>
            Remember me
          </Label>
        </div>
        <div className='text-sm'>
          <Link href='#' className='font-medium' prefetch={false}>
            Forgot your password?
          </Link>
        </div>
      </div>
      <div>
        <Button
          type='submit'
          className='flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
        >
          {loading ? 'Loading...' : 'Sign in'}
        </Button>
      </div>
    </form>
  )
}

export default Page
