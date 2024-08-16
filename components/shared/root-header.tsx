'use client'

import Link from 'next/link'
import { GithubIcon } from 'lucide-react'

import { GeldaLogo } from '@/components/logos/gelda-logo'
import { ToggleTheme } from '@/components/shared/toogle-theme'

const Header = () => {
  return (
    <header className='pt-4 pb-2 px-6 flex items-center justify-between'>
      <Link className='flex items-center justify-center' href='/'>
        <GeldaLogo width={100} height={50} />
      </Link>
      <nav className='ml-auto gap-3 sm:gap-3 flex justify-center items-center'>
        <ToggleTheme />
        <Link href={'https://github.com/kinotio/gelda'} target='_blank'>
          <GithubIcon />
        </Link>
      </nav>
    </header>
  )
}

export { Header }
