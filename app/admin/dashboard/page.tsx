import { DashboardMetricsComponent } from '@/components/admin/dashboard-metrics-component'

const Page = () => {
  return (
    <div className='flex min-h-[calc(92vh_-_theme(spacing.16))] flex-1 flex-col gap-8 p-6 md:gap-12 md:p-12'>
      <DashboardMetricsComponent />
    </div>
  )
}

export default Page
