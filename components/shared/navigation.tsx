'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { icons } from 'lucide-react'

import { Icon } from '@/components/ui/icon'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'

import { MenuType } from '@/lib/definitions'

const Navigation = ({ menus }: { menus: MenuType[] }) => {
  const pathname = usePathname()

  return (
    <div className='relative w-full bg-white dark:bg-slate-950'>
      <NavigationMenu className='w-full px-2'>
        <NavigationMenuList className='mx-4 gap-6'>
          {menus.map((menu) => (
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
  )
}

export { Navigation }
