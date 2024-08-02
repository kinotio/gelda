import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

const Header = () => {
  return (
    <header className='pt-4 pb-2 px-6 flex items-center justify-between'>
      <Link className='flex items-center justify-center' href='/'>
        <Image src='/images/gelda-black.png' width={90} height={90} alt='Gelda' priority />
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <Link href={'https://github.com/kinotio/gelda'}>
          <GithubIcon />
        </Link>
      </nav>
    </header>
  )
}

export { Header }
