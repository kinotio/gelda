import { useState, useEffect } from 'react'

type Metric = {
  type: string
  name: string
  description: string
  value: number
}

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([])

  return { metrics }
}
