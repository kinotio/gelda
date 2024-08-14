import Link from 'next/link'

import { KinotioLogo } from '@/components/logos/kinotio-logo'

import { getCurrentYear } from '@/lib/utils'

const Footer = () => {
  return (
    <footer className='sticky flex flex-col gap-2 sm:flex-row py-2 w-full shrink-0 items-center px-4 md:px-6 border-t'>
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
