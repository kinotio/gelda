import { Metrics } from '@/components/admin/metrics'

const Page = () => {
  return (
    <div className='flex min-h-[calc(92vh_-_theme(spacing.16))] flex-1 flex-col gap-8 p-6 md:gap-12 md:p-12'>
      <Metrics />
    </div>
  )
}

export default Page
