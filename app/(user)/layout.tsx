const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className='flex min-h-[calc(92vh_-_theme(spacing.16))] items-center justify-center'>
      {children}
    </main>
  )
}

export default SubLayout
