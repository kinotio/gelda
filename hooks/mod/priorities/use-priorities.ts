import { useState, useEffect } from 'react'

import { getAll } from '@/server/actions/priorities'
import { PriorityType } from '@/lib/definitions'

export const usePriorities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [priorities, setPriorities] = useState<PriorityType[]>([])

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getAll()
        if (success && data) setPriorities(data)
        setMessage(message)
        setSuccess(success)
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : 'An error occurred during getting all priorities.'
        )
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return { priorities, message, success, loading }
}
