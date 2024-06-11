import Headercomponent from '@/components/root/header-component'
import Footercomponent from '@/components/root/footer-component'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Headercomponent />
      {children}
      <Footercomponent />
    </>
  )
}
