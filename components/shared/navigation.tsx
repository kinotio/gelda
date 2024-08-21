'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { icons } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Icon } from '@/components/ui/icon'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'

import { PATH } from '@/lib/constants'

import { useAuth } from '@/hooks/use-auth'

type Menu = {
  label: string
  path: string
  icon: string
}

const menus = [
  {
    label: 'Overview',
    path: PATH.CLIENT_OVERVIEW,
    icon: 'LayoutDashboard'
  },
  {
    label: 'Tickets',
    path: PATH.CLIENT_TICKETS,
    icon: 'Ticket'
  },
  {
    label: 'Discussions',
    path: PATH.CLIENT_DISCUSSIONS,
    icon: 'MessagesSquare'
  },
  {
    label: 'Settings',
    path: PATH.CLIENT_SETTINGS,
    icon: 'Settings'
  }
] as Menu[]

const Navigation = () => {
  const pathname = usePathname()
  const { authenticatedUser, loading, authenticate } = useAuth()

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!loading && !isEmpty(authenticatedUser) ? (
        <div className='w-full bg-white dark:bg-inherit'>
          <NavigationMenu className='w-full px-2'>
            <NavigationMenuList className='mx-4 gap-6'>
              {menus.map((menu, idx) => (
                <NavigationMenuItem key={menu.path}>
                  <Link href={menu.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`py-4 text-sm flex items-center justify-center gap-2 border-black dark:border-white ${
                        pathname === menu.path
                          ? 'text-black dark:text-white border-b-2'
                          : 'text-black dark:text-inherit'
                      }`}
                    >
                      <Icon name={menu.icon as keyof typeof icons} size={14} />
                      {menu.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Separator />
        </div>
      ) : null}
    </>
  )
}

export { Navigation }
