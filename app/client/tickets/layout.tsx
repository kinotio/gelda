const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div className='flex h-[84vh] flex-1 flex-col gap-8 pl-4'>{children}</div>
}

export default Layout
