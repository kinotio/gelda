import type { Metadata } from 'next'

import { AuthLayout } from '@/components/layouts/auth-layout'

export const metadata: Metadata = { title: 'Gelda' }

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default SubLayout
