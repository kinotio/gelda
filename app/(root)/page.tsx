import HeroComponent from '@/components/root/hero-component'
import AboutComponent from '@/components/root/about-component'

export default function Page() {
  return (
    <div className='flex flex-col min-h-[87dvh]'>
      <main className='flex-1'>
        <HeroComponent />
        <AboutComponent />
      </main>
    </div>
  )
}
