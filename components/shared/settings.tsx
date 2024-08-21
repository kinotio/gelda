import { BellIcon, BellOffIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Settings = () => {
  return (
    <div className='grid gap-8'>
      <Card>
        <CardHeader>
          <CardTitle>Update Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Your name' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='Your email' />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
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
