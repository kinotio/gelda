import { useState, useEffect } from 'react'

import { getTicketsCountQuery } from '@/server/actions/mod/tickets/queries'

import { MetricType } from '@/lib/definitions'

export const useUserTicketsMetrics = () => {
  const [metrics, setMetrics] = useState<MetricType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    getTicketsCountQuery()
      .then(({ data }) => setMetrics(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return { metrics, loading }
}
