import Link from 'next/link'

export default function HeroComponent() {
  return (
    <section className='w-full pt-12'>
      <div className='px-4 md:px-6 space-y-10 xl:space-y-16'>
        <div className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16'>
          <div>
            <h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
              Elevate Your Customer Support With Gelda
            </h1>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 pt-6'>
              Our AI-powered helpdesk platform revolutionizes the way you provide customer support,
              delivering faster resolutions and enhanced user experiences.
            </p>
            <div className='space-x-4 mt-6'>
              <Link
                className='inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                href='#'
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
