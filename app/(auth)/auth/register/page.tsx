'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EyeIcon, EyeOffIcon, AlertCircle } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { AuthSignUpFormType } from '@/lib/definitions'
import { NAME_PATTERN, EMAIL_PATTERN, PASSWORD_PATTERN } from '@/lib/constants'

const Page = () => {
  return (
    <div className='mx-auto w-full max-w-md space-y-8'>
      <div>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight'>
          Sign up to your account
        </h2>
        <p className='mt-2 text-center text-sm'>
          Or{' '}
          <Link href='/auth/signin' className='font-medium' prefetch={false}>
            sign in to your account
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  )
}

const RegisterForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AuthSignUpFormType>()

  const password = watch('password')

  const loading = false
  const message = ''
  const success = false

  const onSubmit: SubmitHandler<AuthSignUpFormType> = async (form) => {
    console.log(form)
  }

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
        <Label htmlFor='name' className='block text-sm font-medium'>
          Name
        </Label>
        <div className='mt-1'>
          <Input
            autoComplete='name'
            id='name'
            type='text'
            placeholder='John Doe'
            className='block w-full appearance-none rounded-md border px-3 py-2 shadow-smfocus:outline-none'
            {...register('name', { required: 'Name is required', pattern: NAME_PATTERN })}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
        </div>
      </div>
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
            className='block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none'
            {...register('email', { required: 'Email is required', pattern: EMAIL_PATTERN })}
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
                required: 'Password is required',
                pattern: PASSWORD_PATTERN
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
      <div>
        <Label htmlFor='confirmPassword' className='block text-sm font-medium'>
          Re-Type Password
        </Label>
        <div className='mt-1'>
          <div className='relative'>
            <Input
              autoComplete='confirmPassword'
              id='confirmPassword'
              type={confirmPasswordVisibility ? 'text' : 'password'}
              placeholder='****************'
              className='block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none'
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => value === password || 'Passwords do not match',
                pattern: PASSWORD_PATTERN
              })}
            />
            <Button
              variant='ghost'
              size='icon'
              type='button'
              className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent'
              onClick={() => setconfirmPasswordVisibility(!confirmPasswordVisibility)}
            >
              {confirmPasswordVisibility ? (
                <EyeOffIcon className='h-4 w-4' />
              ) : (
                <EyeIcon className='h-4 w-4' />
              )}

              <span className='sr-only'>Toggle password visibility</span>
            </Button>
          </div>

          {errors.confirmPassword && (
            <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>
          )}
        </div>
      </div>
      <div>
        <Button
          type='submit'
          disabled={loading}
          className='flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
        >
          {loading ? 'Loading...' : 'Sign up'}
        </Button>
      </div>
    </form>
  )
}

export default Page
