'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BellIcon, BellOffIcon } from 'lucide-react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { NAME_PATTERN, EMAIL_PATTERN } from '@/lib/constants'

import { useAuth } from '@/hooks/use-auth'

const UpdateProfileFormSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  username: z.string().min(3, { message: 'Username is required' }),
  email: z.string().email({ message: 'Invalid email' })
})

const Settings = () => {
  const { authenticatedUser, authenticate, updateProfileInformation, loading } = useAuth()

  const {
    register: registerUpdateProfileForm,
    handleSubmit,
    formState: { errors: registerUpdateProfileFormError },
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
    <div className='grid gap-8'>
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
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='current-password'>Current Password</Label>
              <Input
                id='current-password'
                type='password'
                placeholder='Enter your current password'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='new-password'>New Password</Label>
              <Input id='new-password' type='password' placeholder='Enter your new password' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                type='password'
                placeholder='Confirm your new password'
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Change Password</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inboxes Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
            <BellIcon className='mt-px h-5 w-5' />
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>Everything</p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Ticket opened, resolved & all activity.
              </p>
            </div>
          </div>
          <div className='-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
            <BellOffIcon className='mt-px h-5 w-5' />
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>Ignoring</p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Turn off all notifications.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export { Settings }
