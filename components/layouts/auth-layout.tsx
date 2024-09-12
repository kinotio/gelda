'use client'

import Link from 'next/link'
import { GithubIcon } from 'lucide-react'

import { GeldaLogo } from '@/components/svg/gelda-logo'
import { ToggleTheme } from '@/components/shared/toogle-theme'
import { KinotioLogo } from '@/components/svg/kinotio-logo'

import { getCurrentYear } from '@/lib/utils'

const AuthLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <div className='fixed top-0 w-full'>
        <Header />
      </div>
      <main className='flex items-center justify-center mt-[100px] mb-[100px]'>{children}</main>
      <Footer />
    </>
  )
}

const Header = () => {
  return (
    <header className='w-full pt-4 pb-2 px-6 flex items-center justify-between bg-white dark:dark:bg-slate-950'>
      <Link className='flex items-center justify-center' href='/'>
        <GeldaLogo width={100} height={50} />
      </Link>
      <nav className='ml-auto gap-3 sm:gap-3 flex justify-center items-center'>
        <div className='ml-auto gap-3 sm:gap-3 flex justify-center items-center'>
          <ToggleTheme />
          <Link href={'https://github.com/kinotio/gelda'} target='_blank'>
            <GithubIcon size={20} />
          </Link>
        </div>
      </nav>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className='fixed bottom-0 flex flex-col gap-2 sm:flex-row py-2 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:dark:bg-slate-950'>
      <div>
        <h3>
          Copyright
          {` © ${getCurrentYear()} `}
          <Link
            target='_blank'
            href='https://kinotio.io'
            className='text-primary transition-all border-primary hover:border-b-2 ml-1'
          >
            Developed by Kinotio.
          </Link>
        </h3>
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

export { AuthLayout }
