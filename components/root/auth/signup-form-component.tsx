'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import type { TSignUpForm } from '@/types'

import { NAME_PATTERN, EMAIL_PATTERN, PASSWORD_PATTERN } from '@/constants'

export default function SignupFormComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TSignUpForm>()

  const password = watch('password')

  const onSubmit: SubmitHandler<TSignUpForm> = (data) => console.log(data)

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
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
          <Input
            id='password'
            type='password'
            placeholder='****************'
            className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
            {...register('password', {
              required: 'Password is required',
              pattern: PASSWORD_PATTERN
            })}
          />
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
          <Input
            id='confirmPassword'
            type='password'
            placeholder='****************'
            className='block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-gray-700 focus:outline-none focus:ring-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500'
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === password || 'Passwords do not match',
              pattern: PASSWORD_PATTERN
            })}
          />
          {errors.confirmPassword && (
            <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>
          )}
        </div>
      </div>
      <div>
        <Button
          type='submit'
          className='flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600'
        >
          Sign up
        </Button>
      </div>
    </form>
  )
}
