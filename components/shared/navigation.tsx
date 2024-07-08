'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'

type Menu = {
  label: string
  path: string
}

const Navigation = ({ menus }: { menus: Menu[] }) => {
  const pathname = usePathname()

  return (
    <div className='bg-gray-50 mx-2'>
      <NavigationMenu>
        <NavigationMenuList className='mx-4 gap-6'>
          {menus.map((menu, idx) => (
            <NavigationMenuItem key={idx}>
              <Link href={menu.path} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`py-4 text-sm flex items-center justify-center gap-2 border-black ${
                    pathname === menu.path ? 'text-black border-b-2' : 'text-gray-500'
                  }`}
                >
                  {menu.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export { Navigation }
