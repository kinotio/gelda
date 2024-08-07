import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

import { APP_VERSION } from '@/lib/constants'

const Footer = () => {
  return (
    <footer className='sticky border-t bottom-0 flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 bg-white'>
      <div className='gap-6 flex'>
        <Link href={'https://github.com/kinotio/gelda'}>
          <GithubIcon className='w-5 h-5' />
        </Link>
        <Badge>{`v${APP_VERSION}`}</Badge>
      </div>
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
