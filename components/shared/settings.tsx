'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BellIcon, BellOffIcon, EyeIcon, EyeOffIcon } from 'lucide-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { NAME_PATTERN, EMAIL_PATTERN, PASSWORD_PATTERN } from '@/lib/constants'

import { useAuth } from '@/hooks/use-auth'

const UpdateProfileFormSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  username: z.string().min(3, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email' })
})

const ChangePasswordFormSchema = z
  .object({
    currentPassword: z.string({ message: 'Current Password is required' }),
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
    register: registerUpdateProfileForm,
    handleSubmit: handleSubmitUpdateProfileForm,
    formState: { errors: registerUpdateProfileFormError },
    reset: resetUpdateProfileForm
  } = useForm<z.infer<typeof UpdateProfileFormSchema>>({
    resolver: zodResolver(UpdateProfileFormSchema)
  })

  const onUpdateProfileSubmit = async (form: z.infer<typeof UpdateProfileFormSchema>) => {
    updateProfileInformation(form).finally(() => {
      resetUpdateProfileForm()
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
        <form
          className='grid gap-4'
          onSubmit={handleSubmitUpdateProfileForm(onUpdateProfileSubmit)}
        >
          <div className='grid gap-3'>
            <Label htmlFor='name'>Name</Label>
            <Input
              autoComplete='name'
              id='name'
              type='text'
              placeholder='Enter name'
              defaultValue={authenticatedUser?.name}
              {...registerUpdateProfileForm('name', {
                pattern: NAME_PATTERN
              })}
            />
            {registerUpdateProfileFormError.name && (
              <span className='text-red-500 text-sm'>
                {registerUpdateProfileFormError.name.message}
              </span>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='username'>Username</Label>
            <Input
              autoComplete='username'
              id='username'
              type='text'
              placeholder='Enter username'
              defaultValue={authenticatedUser?.username}
              {...registerUpdateProfileForm('username')}
            />
            {registerUpdateProfileFormError.username && (
              <span className='text-red-500 text-sm'>
                {registerUpdateProfileFormError.username.message}
              </span>
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
              {...registerUpdateProfileForm('email', {
                pattern: EMAIL_PATTERN
              })}
            />
            {registerUpdateProfileFormError.email && (
              <span className='text-red-500 text-sm'>
                {registerUpdateProfileFormError.email.message}
              </span>
            )}
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
  const { loading } = useAuth()

  const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState<boolean>(false)
  const [newPasswordVisibility, setNewPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false)

  const {
    register: registerChangePasswordForm,
    handleSubmit: handleSubmitChangePasswordForm,
    formState: { errors: registerChangePasswordFormError },
    reset: resetChangePasswordForm
  } = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema)
  })

  const onChangePasswordSubmit = async (form: z.infer<typeof ChangePasswordFormSchema>) => {
    console.log(form)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className='grid gap-4'
          onSubmit={handleSubmitChangePasswordForm(onChangePasswordSubmit)}
        >
          <div className='grid gap-3'>
            <Label htmlFor='current-password'>Current Password</Label>
            <div className='relative'>
              <Input
                id='current-password'
                type={currentPasswordVisibility ? 'text' : 'password'}
                placeholder='Enter your current password'
                {...registerChangePasswordForm('currentPassword')}
              />
              <Button
                variant='ghost'
                size='icon'
                type='button'
                className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent'
                onClick={() => setCurrentPasswordVisibility(!currentPasswordVisibility)}
              >
                {currentPasswordVisibility ? (
                  <EyeOffIcon className='h-4 w-4' />
                ) : (
                  <EyeIcon className='h-4 w-4' />
                )}

                <span className='sr-only'>Toggle password visibility</span>
              </Button>
            </div>

            {registerChangePasswordFormError.currentPassword && (
              <span className='text-red-500 text-sm'>
                {registerChangePasswordFormError.currentPassword.message}
              </span>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='new-password'>New Password</Label>
            <div className='relative'>
              <Input
                id='new-password'
                type={newPasswordVisibility ? 'text' : 'password'}
                placeholder='Enter your new password'
                {...registerChangePasswordForm('newPassword', {
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

            {registerChangePasswordFormError.newPassword && (
              <span className='text-red-500 text-sm'>
                {registerChangePasswordFormError.newPassword.message}
              </span>
            )}
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='confirm-password'>Confirm Password</Label>
            <div className='relative'>
              <Input
                id='confirm-password'
                type={confirmPasswordVisibility ? 'text' : 'password'}
                placeholder='Confirm your new password'
                {...registerChangePasswordForm('confirmPassword', {
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

            {registerChangePasswordFormError.confirmPassword && (
              <span className='text-red-500 text-sm'>
                {registerChangePasswordFormError.confirmPassword.message}
              </span>
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
  const { authenticate, getUserInboxesPreferences, inboxesPreferences, loading } = useAuth()
  const [userInboxesPreferences, setUserInboxesPreferences] = useState<string>()

  const preference = inboxesPreferences?.[0].preference as string

  const onSubmitSaveUserInboxesPreferences = async () => {
    console.log(userInboxesPreferences)
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
        <div className='w-full flex flex-col gap-2'>
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
