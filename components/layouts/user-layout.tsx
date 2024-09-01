'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { GithubIcon, InboxIcon, LogOutIcon, UserIcon, CalendarCheckIcon } from 'lucide-react'
import { isEmpty } from 'lodash'

import { GeldaLogo } from '@/components/svg/gelda-logo'
import { ToggleTheme } from '@/components/shared/toogle-theme'
import { KinotioLogo } from '@/components/svg/kinotio-logo'
import { Button } from '@/components/ui/button'
import { Avatar as AvatarRoot, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/shared/navigation'

import {
  APP_VERSION,
  USER_ROLES,
  USER_INBOXES_PREFERENCES,
  PATH,
  EVENT_TYPES
} from '@/lib/constants'
import { MenuType, Event } from '@/lib/definitions'

import { useAuth } from '@/hooks/use-auth'
import { useEvents } from '@/hooks/use-events'

const UserLayout = ({
  menus,
  children
}: Readonly<{
  menus: MenuType[]
  children: React.ReactNode
}>) => {
  return (
    <>
      <div className='fixed top-0 w-full z-50'>
        <Header />
        <Navigation menus={menus} />
      </div>
      <main className='flex items-center justify-center mt-[100px]'>{children}</main>
      <Footer />
    </>
  )
}

const Header = () => {
  const { authenticate, authenticatedUser } = useAuth()

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
        <div className='flex items-center justify-center gap-4'>
          {authenticatedUser?.user_roles[0].role === USER_ROLES.client ? (
            <Badge className='h-8 cursor-pointer font-medium text-center'>
              <Link href={'/c/overview'} prefetch={false}>
                Create Ticket
              </Link>
            </Badge>
          ) : null}

          <Badge variant='outline' className='h-8 cursor-pointer font-medium text-center'>
            <Link href={'https://github.com/kinotio/gelda/issues'} target='_blank'>
              Feedback
            </Link>
          </Badge>
          <Inboxes />
          <ToggleTheme />
          <UserSettings />
        </div>
      </nav>
    </header>
  )
}

const Inboxes = () => {
  const { loading, getUserInboxes, inboxes, authenticatedUser, authenticate } = useAuth()

  const predicateFn = useCallback((event: Event) => event.type === 'inboxes_preferences_change', [])
  const { events } = useEvents(predicateFn)

  useEffect(() => {
    authenticate()
    getUserInboxes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Array.isArray(events) && events.length > 0) {
      const inboxesPreferencesEvent = events
        .filter(({ type }) => type === EVENT_TYPES.inboxesPreferencesChange)
        .shift()

      if (!isEmpty(inboxesPreferencesEvent)) authenticate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  const Inboxes = () => {
    if (!loading) {
      if (
        authenticatedUser?.inboxes_preferences[0].preference === USER_INBOXES_PREFERENCES.ignoring
      ) {
        return (
          <div className='space-y-4 text-center flex flex-col'>
            <span>
              You set the inboxes preference to be ignore , update your Inboxes Preferences in
              settings
            </span>
            <Link href={PATH.CLIENT_SETTINGS} className='underline text-sm'>
              View settings
            </Link>
          </div>
        )
      }

      if (Array.isArray(inboxes) && inboxes.length > 0) {
        return (
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                <CalendarCheckIcon className='h-4 w-4' />
              </div>
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium'>Meeting Reminder</p>
                <p className='text-sm text-muted-foreground'>
                  Your weekly team meeting is in 15 minutes.
                </p>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className='space-y-4 text-center'>
            <span>You have no inboxes</span>
          </div>
        )
      }
    }

    return (
      <div className='w-full flex flex-col gap-3 space-y-4'>
        <div className='h-14 rounded-md bg-muted' />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <InboxIcon size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[360px] p-4'>
        <DropdownMenuLabel className='mb-2 text-lg font-bold'>Inboxes</DropdownMenuLabel>
        <Inboxes />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const UserSettings = () => {
  const { authenticatedUser, logout, authenticate } = useAuth()

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
      <DropdownMenuContent
        align='end'
        className='w-[240px] p-4 bg-card text-card-foreground rounded-md shadow-lg'
      >
        <div className='mb-2'>
          <DropdownMenuLabel className='text-md font-bold'>
            {authenticatedUser?.name}
          </DropdownMenuLabel>
          <DropdownMenuLabel className='text-sm font-medium'>
            @{authenticatedUser?.username}
          </DropdownMenuLabel>
        </div>
        <div className='space-y-2'>
          <Button
            className='flex items-center gap-2 hover:bg-muted/50 px-2 py-1 rounded-md w-full'
            variant='outline'
            onClick={logout}
          >
            <LogOutIcon className='h-4 w-4' />
            <span>Logout</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Footer = () => {
  return (
    <footer className='fixed bottom-0 flex flex-col gap-2 sm:flex-row py-2 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:dark:bg-slate-950'>
      <div className='gap-6 flex'>
        <Link href={'https://github.com/kinotio/gelda'}>
          <GithubIcon className='w-5 h-5' />
        </Link>
        <Badge>{`v${APP_VERSION}`}</Badge>
      </div>

      <nav className='sm:ml-auto flex gap-2 items-center'>
        <span className='text-sm font-semibold'>By</span>
        <Link href={'https://github.com/kinotio'}>
          <KinotioLogo width={100} height={50} />
        </Link>
      </nav>
    </footer>
  )
}

export { UserLayout }
