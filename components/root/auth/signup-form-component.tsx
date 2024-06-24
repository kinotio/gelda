'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { EyeIcon, EyeOffIcon, AlertCircle } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { AuthSignUpFormType } from '@/lib/definitions'
import { NAME_PATTERN, EMAIL_PATTERN, PASSWORD_PATTERN } from '@/lib/constants'
import { useSignup } from '@/hooks/auth/use-signup'

export default function SignupFormComponent() {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AuthSignUpFormType>()
  const { loading, signUp, message, success } = useSignup()

  const password = watch('password')

  const onSubmit: SubmitHandler<AuthSignUpFormType> = async (form) => await signUp(form)

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
          htmlFor='name'
          className='block text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Name
        </Label>
        <div className='mt-1'>
          <Input
            id='name'
            type='text'
            placeholder='John Doe'
            className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
            {...register('name', { required: 'Name is required', pattern: NAME_PATTERN })}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
        </div>
      </div>
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
            {...register('email', { required: 'Email is required', pattern: EMAIL_PATTERN })}
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
                required: 'Password is required',
                pattern: PASSWORD_PATTERN
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
      <div>
        <Label
          htmlFor='confirmPassword'
          className='block text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Re-Type Password
        </Label>
        <div className='mt-1'>
          <div className='relative'>
            <Input
              id='confirmPassword'
              type={confirmPasswordVisibility ? 'text' : 'password'}
              placeholder='****************'
              className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
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
              className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
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
          className='flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600'
        >
          {loading ? 'Loading...' : 'Sign up'}
        </Button>
      </div>
    </form>
  )
}
