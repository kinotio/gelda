'use client'

import { useState, useEffect } from 'react'

import { list as listAction } from '@/server/actions/activities'

import { ActivityType } from '@/lib/definitions'

import { useRealtime } from '@/hooks/use-realtime'

export const useActivities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [activities, setActivities] = useState<ActivityType[]>([])

  const { newData } = useRealtime<ActivityType>({ table: 'activities' })

  useEffect(() => {
    if (newData) setActivities((prevActivities) => [newData, ...(prevActivities || [])])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  const list = async () => {
    setLoading(true)
    listAction({})
      .then((data) => setActivities(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const states = { loading, message, activities }

  const methods = { list }

  return { ...states, ...methods }
}
