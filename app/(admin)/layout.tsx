import type { Metadata } from 'next'

import { UserLayout } from '@/components/layouts/user-layout'

export const metadata: Metadata = { title: 'Gelda - Admin' }

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <UserLayout>{children}</UserLayout>
}

export default SubLayout
