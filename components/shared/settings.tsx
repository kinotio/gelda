'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { BellIcon, BellOffIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { NAME_PATTERN, EMAIL_PATTERN, PASSWORD_PATTERN } from '@/lib/constants'
import { Event } from '@/lib/definitions'

import { useAuth } from '@/hooks/use-auth'
import { useEvents } from '@/hooks/use-events'

const UpdateProfileFormSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  username: z.string().min(3, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email' })
})

const ChangePasswordFormSchema = z
  .object({
    newPassword: z.string().min(8, { message: 'New Password is required' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password is required' })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

const Settings = () => {
  return (
    <div className='grid gap-8'>
      <UpdateProfileInformationSettings />
      <ChangePasswordSettings />
      <InboxesPreferencesSettings />
    </div>
  )
}

const UpdateProfileInformationSettings = () => {
  const { authenticatedUser, authenticate, updateProfileInformation, loading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof UpdateProfileFormSchema>>({
    resolver: zodResolver(UpdateProfileFormSchema)
  })

  const onUpdateProfileSubmit = async (form: z.infer<typeof UpdateProfileFormSchema>) => {
    updateProfileInformation(form).finally(() => {
      reset()
      authenticate()
    })
  }

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='grid gap-4' onSubmit={handleSubmit(onUpdateProfileSubmit)}>
          <div className='grid gap-3'>
            <Label htmlFor='name'>Name</Label>
            <Input
              autoComplete='name'
              id='name'
              type='text'
              placeholder='Enter name'
              defaultValue={authenticatedUser?.name}
              {...register('name', {
                pattern: NAME_PATTERN
              })}
            />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='username'>Username</Label>
            <Input
              autoComplete='username'
              id='username'
              type='text'
              placeholder='Enter username'
              defaultValue={authenticatedUser?.username}
              {...register('username')}
            />
            {errors.username && (
              <span className='text-red-500 text-sm'>{errors.username.message}</span>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='email'>Email</Label>
            <Input
              autoComplete='email'
              id='email'
              type='text'
              placeholder='Enter email'
              defaultValue={authenticatedUser?.email}
              {...register('email', {
                pattern: EMAIL_PATTERN
              })}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
          </div>

          <Button type='submit' className='w-1/5' disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

const ChangePasswordSettings = () => {
  const { loading, updatePassword, authenticate } = useAuth()

  const [newPasswordVisibility, setNewPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema)
  })

  const onChangePasswordSubmit = async (form: z.infer<typeof ChangePasswordFormSchema>) => {
    updatePassword(form).finally(() => {
      reset()
      authenticate()
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='grid gap-4' onSubmit={handleSubmit(onChangePasswordSubmit)}>
          <div className='grid gap-3'>
            <Label htmlFor='new-password'>New Password</Label>
            <div className='relative'>
              <Input
                id='new-password'
                type={newPasswordVisibility ? 'text' : 'password'}
                placeholder='Enter your new password'
                {...register('newPassword', {
                  pattern: PASSWORD_PATTERN
                })}
              />
              <Button
                variant='ghost'
                size='icon'
                type='button'
                className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent'
                onClick={() => setNewPasswordVisibility(!newPasswordVisibility)}
              >
                {newPasswordVisibility ? (
                  <EyeOffIcon className='h-4 w-4' />
                ) : (
                  <EyeIcon className='h-4 w-4' />
                )}

                <span className='sr-only'>Toggle password visibility</span>
              </Button>
            </div>

            {errors.newPassword && (
              <span className='text-red-500 text-sm'>{errors.newPassword.message}</span>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='confirm-password'>Confirm Password</Label>
            <div className='relative'>
              <Input
                id='confirm-password'
                type={confirmPasswordVisibility ? 'text' : 'password'}
                placeholder='Confirm your new password'
                {...register('confirmPassword', {
                  pattern: PASSWORD_PATTERN
                })}
              />
              <Button
                variant='ghost'
                size='icon'
                type='button'
                className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent'
                onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}
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

          <Button type='submit' className='w-1/5' disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

const InboxesPreferencesSettings = () => {
  const {
    authenticate,
    getUserInboxesPreferences,
    inboxesPreferences,
    loading,
    updateUserInboxesPreferences
  } = useAuth()
  const [userInboxesPreferences, setUserInboxesPreferences] = useState<string>('')

  const predicateFn = useCallback((event: Event) => event.type === 'inboxes_preferences_change', [])
  const { events, publish } = useEvents(predicateFn)

  const preference = inboxesPreferences?.[0].preference as string

  const onSubmitSaveUserInboxesPreferences = async () => {
    updateUserInboxesPreferences(userInboxesPreferences).finally(() => {
      authenticate()
      publish({ type: 'inboxes_preferences_change', message: 'User inboxes preferences changed' })
    })
  }

  useEffect(() => {
    authenticate()
    getUserInboxesPreferences()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUserInboxesPreferences(preference)
  }, [preference])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inboxes Preferences</CardTitle>
      </CardHeader>
      {loading ? (
        <div className='container w-full flex flex-col gap-2 py-6'>
          <div className='h-14 rounded-md bg-muted' />
          <div className='h-14 rounded-md bg-muted' />
        </div>
      ) : (
        <>
          <CardContent className='flex flex-col gap-2'>
            <Button
              className={`-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 cursor-pointer h-14 justify-start ${userInboxesPreferences === 'everything' ? 'bg-gray-300 dark:bg-gray-900 dark:text-gray-50' : null}`}
              variant='ghost'
              onClick={() => setUserInboxesPreferences('everything')}
            >
              <BellIcon className='mt-px h-5 w-5' />
              <div className='space-y-1 text-start'>
                <p className='text-sm font-medium leading-none'>Everything</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Ticket opened, resolved & all activity.
                </p>
              </div>
            </Button>
            <Button
              className={`-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-14 justify-start ${userInboxesPreferences === 'ignoring' ? 'bg-gray-300 dark:bg-gray-900 dark:text-gray-50' : null}`}
              variant='ghost'
              onClick={() => setUserInboxesPreferences('ignoring')}
            >
              <BellOffIcon className='mt-px h-5 w-5' />
              <div className='space-y-1 text-start'>
                <p className='text-sm font-medium leading-none'>Ignoring</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Turn off all notifications.
                </p>
              </div>
            </Button>
          </CardContent>
          <CardFooter>
            <Button onClick={onSubmitSaveUserInboxesPreferences}>Save Changes</Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export { Settings }
