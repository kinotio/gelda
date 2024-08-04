import { useState, useEffect } from 'react'

import { useUser } from '@/hooks/mod/users/use-user'
import { getTicketsCountQuery } from '@/server/actions/mod/tickets/queries'
import { MetricType } from '@/lib/definitions'

export const useUserTicketsMetrics = () => {
  const [metrics, setMetrics] = useState<MetricType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { user } = useUser()
  const userId = user?.id as string

  useEffect(() => {
    setLoading(true)
    getTicketsCountQuery({ userId })
      .then(({ data }) => setMetrics(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return { metrics, loading }
}
