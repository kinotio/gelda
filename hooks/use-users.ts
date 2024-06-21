import { useState, useEffect } from 'react'

import { TUser } from '@/types'

import { getAllUsers } from '@/actions/users'

export function useUsers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [users, setUsers] = useState<TUser>()

  const getUsers = async () => {
    try {
      const { success, message, data } = await getAllUsers()
      if (success && data) {
        setUsers(data)
        setSuccess(true)
      } else {
        setMessage(message)
        setSuccess(false)
      }
    } catch (error) {
      setMessage('An error occurred during getting all users.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return { users, message, success, loading }
}
