'use client'

import { LifeBuoy, LogOut, Settings, User } from 'lucide-react'

import { Avatar as AvatarRoot, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { useUser } from '@/hooks/mod/users/use-user'
import { useSignout } from '@/hooks/auth/use-signout'

import { getInitials } from '@/lib/utils'

const Avatar = () => {
  const { loading, user } = useUser()
  const { signOut } = useSignout()

  return (
    <>
      {loading ? null : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='rounded-full' size='icon' variant='ghost'>
              <AvatarRoot>
                <AvatarFallback>{getInitials(user)}</AvatarFallback>
              </AvatarRoot>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-56 mr-2 mt-2'>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy className='mr-2 h-4 w-4' />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export { Avatar }
