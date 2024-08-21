'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { GithubIcon } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Badge } from '@/components/ui/badge'
import { KinotioLogo } from '@/components/svg/kinotio-logo'

import { getCurrentYear } from '@/lib/utils'
import { APP_VERSION } from '@/lib/constants'

import { useAuth } from '@/hooks/use-auth'

const Footer = () => {
  const { loading, authenticatedUser, authenticate } = useAuth()

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <footer className='fixed bottom-0 flex flex-col gap-2 sm:flex-row py-2 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-inherit'>
      {!loading && isEmpty(authenticatedUser) ? (
        <div>
          <h3>
            Copyright
            {` © ${getCurrentYear()} `}
            <Link
              target='_blank'
              href='https://kinotio.io'
              className='text-primary transition-all border-primary hover:border-b-2 ml-1'
            >
              Developed by Kinotio. All rights reserved.
            </Link>
          </h3>
        </div>
      ) : (
        <div className='gap-6 flex'>
          <Link href={'https://github.com/kinotio/gelda'}>
            <GithubIcon className='w-5 h-5' />
          </Link>
          <Badge>{`v${APP_VERSION}`}</Badge>
        </div>
      )}

      <nav className='sm:ml-auto flex gap-2 items-center'>
        <span className='text-sm font-semibold'>By</span>
        <Link href={'https://github.com/kinotio'}>
          <KinotioLogo width={100} height={50} />
        </Link>
      </nav>
    </footer>
  )
}

export { Footer }
