import { HeaderComponent } from '@/components/root/header-component'
import { Footercomponent } from '@/components/root/footer-component'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <HeaderComponent />
      {children}
      <Footercomponent />
    </>
  )
}

export default Layout
