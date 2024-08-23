import type { Metadata } from 'next'

import { RootLayout } from '@/components/layouts/root-layout'

export const metadata: Metadata = { title: 'Gelda' }

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <RootLayout>{children}</RootLayout>
}

export default SubLayout
