const Loading = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background'>
      <div className='grid w-full max-w-4xl gap-6'>
        <div className='animate-pulse space-y-4'>
          <div className='h-12 w-full rounded-md bg-muted' />
          <div className='grid grid-cols-2 gap-4'>
            <div className='h-48 rounded-md bg-muted' />
            <div className='h-48 rounded-md bg-muted' />
          </div>
          <div className='h-4 w-full rounded-md bg-muted' />
          <div className='h-4 w-full rounded-md bg-muted' />
          <div className='h-4 w-full rounded-md bg-muted' />
          <div className='h-4 w-full rounded-md bg-muted' />
        </div>
      </div>
    </div>
  )
}

export default Loading
