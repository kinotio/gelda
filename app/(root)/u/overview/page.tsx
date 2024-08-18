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
    <div>
      <h1>Welcome, {authenticatedUser?.user_metadata.name}</h1>
    </div>
  )
}

export default Page
