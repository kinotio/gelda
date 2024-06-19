import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function DashboardMetricsComponent() {
  return (
    <div className='grid gap-12 md:grid-cols-2'>
      <Card className='bg-primary text-primary-foreground p-8'>
        <CardHeader className='flex flex-row items-center justify-between pb-3'>
          <CardTitle className='text-base font-medium'>Total Users</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          <div className='text-6xl font-bold'>2,389</div>
        </CardContent>
      </Card>
      <Card className='bg-secondary text-secondary-foreground p-8'>
        <CardHeader className='flex flex-row items-center justify-between pb-3'>
          <CardTitle className='text-base font-medium'>Open Tickets</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          <div className='text-6xl font-bold'>125</div>
        </CardContent>
      </Card>
      <Card className='bg-muted text-muted-foreground p-8'>
        <CardHeader className='flex flex-row items-center justify-between pb-3'>
          <CardTitle className='text-base font-medium'>Closed Tickets</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          <div className='text-6xl font-bold'>312</div>
        </CardContent>
      </Card>
      <Card className='text-success-foreground p-8'>
        <CardHeader className='flex flex-row items-center justify-between pb-3'>
          <CardTitle className='text-base font-medium'>Resolved Tickets</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          <div className='text-6xl font-bold'>1,245</div>
        </CardContent>
      </Card>
    </div>
  )
}
