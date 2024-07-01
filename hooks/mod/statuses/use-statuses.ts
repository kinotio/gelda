import { useState, useEffect } from 'react'

import { getAllStatusesQuery } from '@/server/actions/mod/statuses/queries'
import { StatusType } from '@/lib/definitions'

export const useStatuses = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [statuses, setStatuses] = useState<StatusType[]>([])

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getAllStatusesQuery()
        if (success && data) setStatuses(data)
        setMessage(message)
        setSuccess(success)
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : 'An error occurred during getting all statuses.'
        )
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return { statuses, message, success, loading }
}
