import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

export default function Headercomponent() {
  return (
    <header className='px-4 lg:px-6 h-14 flex items-center'>
      <Link className='flex items-center justify-center' href='/'>
        <Image src='/images/gelda-black.png' width={100} height={100} alt='Gelda Logo' />
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <Link href={'https://github.com/kinotio/gelda'}>
          <GithubIcon />
        </Link>
      </nav>
    </header>
  )
}
