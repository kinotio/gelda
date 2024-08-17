'use client'

import { useAuth } from '@/hooks/use-auth'

const Page = () => {
  const { authenticatedUser } = useAuth()

  return (
    <div>
      <h1>Welcome, {authenticatedUser?.user_metadata.name}</h1>
    </div>
  )
}

export default Page
