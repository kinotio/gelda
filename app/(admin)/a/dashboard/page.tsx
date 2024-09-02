'use client'

import { useEffect } from 'react'

import { useAuth } from '@/hooks/use-auth'

const Page = () => {
  const { authenticatedUser, authenticate } = useAuth()

  useEffect(() => {
    authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='mb-[100px]'>
      <h1>Welcome, {authenticatedUser?.email}</h1>
    </div>
  )
}

export default Page
