'use client'

import { useState } from 'react'

import { list as listAction } from '@/server/actions/activities'

import { ActivityType } from '@/lib/definitions'

export const useActivities = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [activities, setActivities] = useState<ActivityType[]>([])

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
