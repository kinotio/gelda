'use client'

import { LifeBuoy, LogOut } from 'lucide-react'

import { Avatar as AvatarRoot, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
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
      {loading ? (
        <Button className='rounded-full' size='icon' variant='ghost'>
          <AvatarRoot className='flex justify-center items-center'>
            <AvatarFallback>{getInitials(user)}</AvatarFallback>
          </AvatarRoot>
        </Button>
      ) : (
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
