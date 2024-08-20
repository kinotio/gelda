'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { EyeIcon, EyeOffIcon, AlertCircle } from 'lucide-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { NAME_PATTERN, EMAIL_PATTERN, PASSWORD_PATTERN } from '@/lib/constants'

import { useAuth } from '@/hooks/use-auth'

const RegisterFormSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  username: z.string().min(3, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password is required' }),
  confirmPassword: z.string().min(8, { message: 'Confirm Password is required' })
})

const Page = () => {
  return (
    <div className='mx-auto w-full max-w-md space-y-8'>
      <div>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight'>
          Register your account
        </h2>
        <p className='mt-2 text-center text-sm'>
          Or{' '}
          <Link href='/auth/login' className='font-medium' prefetch={false}>
            login to your account
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  )
}

const RegisterForm = () => {
  const {
    register: registerForm,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema)
  })
  const { register, message, loading } = useAuth()

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] = useState<boolean>(false)

  const password = watch('password')

  const onSubmit = async (form: z.infer<typeof RegisterFormSchema>) => {
    register(form).finally(() => reset())
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      {message !== '' ? (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}

      <div className='flex flex-col gap-1'>
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
            {...registerForm('name', { required: 'Name is required', pattern: NAME_PATTERN })}
          />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <Label htmlFor='username' className='block text-sm font-medium'>
          Username
        </Label>
        <div className='mt-1'>
          <Input
            autoComplete='username'
            id='username'
            type='text'
            placeholder='johndoe'
            className='block w-full appearance-none rounded-md border px-3 py-2 shadow-smfocus:outline-none'
            {...registerForm('username', {
              required: 'Username is required'
            })}
          />
          {errors.username && (
            <span className='text-red-500 text-sm'>{errors.username.message}</span>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
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
            {...registerForm('email', { required: 'Email is required', pattern: EMAIL_PATTERN })}
          />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
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
              {...registerForm('password', {
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
      <div className='flex flex-col gap-1'>
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
              {...registerForm('confirmPassword', {
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
