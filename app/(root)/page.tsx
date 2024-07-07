import { Hero } from '@/components/root/hero'
import { About } from '@/components/root/about'

const Page = () => {
  return (
    <div className='flex flex-col min-h-[87dvh]'>
      <div className='flex-1'>
        <Hero />
        <About />
      </div>
    </div>
  )
}

export default Page
