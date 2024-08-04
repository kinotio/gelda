import { useState, useEffect } from 'react'

import { getAllResolutionsQuery } from '@/server/actions/mod/resolutions/queries'
import { ResolutionType } from '@/lib/definitions'

export const useResolutions = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [resolutions, setResolutions] = useState<ResolutionType[]>([])

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { success, message, data } = await getAllResolutionsQuery()
        if (success && data) setResolutions(data)
        setMessage(message)
        setSuccess(success)
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : 'An error occurred during getting all resolutions.'
        )
        setSuccess(false)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return { resolutions, message, success, loading }
}
