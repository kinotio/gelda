import Link from 'next/link'
import Image from 'next/image'

import { getCurrentYear } from '@/lib/utils'

const Footer = () => {
  return (
    <footer className='sticky bottom-0 border-t flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6'>
      <p className='text-xs text-gray-500 dark:text-gray-400'>{`© ${getCurrentYear()} Kinotio`}</p>
      <nav className='sm:ml-auto flex gap-2 items-center'>
        <span className='text-sm font-semibold'>By</span>
        <Link href={'https://github.com/kinotio'}>
          <Image
            src='/images/kinotio-logo-dark.png'
            alt='Kinotio'
            width={80}
            height={80}
            priority
          />
        </Link>
      </nav>
    </footer>
  )
}

export { Footer }
