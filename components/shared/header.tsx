'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { GithubIcon, InboxIcon, LifeBuoy, LogOut, UserIcon } from 'lucide-react'
import { isEmpty } from 'lodash'

import { GeldaLogo } from '@/components/svg/gelda-logo'
import { ToggleTheme } from '@/components/shared/toogle-theme'
import { Button } from '@/components/ui/button'
import { Avatar as AvatarRoot, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAuth } from '@/hooks/use-auth'

const Header = () => {
  const { authenticatedUser, logout, loading, authenticate } = useAuth()

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className='w-full pt-4 pb-2 px-6 flex items-center justify-between bg-white dark:dark:bg-slate-950'>
      <Link className='flex items-center justify-center' href='/'>
        <GeldaLogo width={100} height={50} />
      </Link>
      <nav className='ml-auto gap-3 sm:gap-3 flex justify-center items-center'>
        {!loading && isEmpty(authenticatedUser) ? (
          <div className='ml-auto gap-3 sm:gap-3 flex justify-center items-center'>
            <ToggleTheme />
            <Link href={'https://github.com/kinotio/gelda'} target='_blank'>
              <GithubIcon size={20} />
            </Link>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-4'>
            <Button className='rounded-full' size='icon' variant='ghost'>
              <InboxIcon size={20} />
            </Button>

            <ToggleTheme />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='rounded-full bg-white' size='icon' variant='ghost'>
                  <AvatarRoot>
                    <AvatarFallback className='flex justify-center items-center bg-white text-black'>
                      <UserIcon size={20} />
                    </AvatarFallback>
                  </AvatarRoot>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='min-w-56 mr-8 mt-2'>
                <DropdownMenuLabel>{authenticatedUser?.name}</DropdownMenuLabel>
                <DropdownMenuLabel className='font-medium'>
                  {`@${authenticatedUser?.username}`}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LifeBuoy className='mr-2 h-4 w-4' />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </nav>
    </header>
  )
}

export { Header }
