'use client'

import { useState, useEffect } from 'react'

import { listAll as listAllAction, list as listAction } from '@/server/actions/users'

import { UserType } from '@/lib/definitions'

import { useRealtime } from '@/hooks/use-realtime'

export const useUsers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [allUsers, setAllUsers] = useState<UserType[]>([])
  const [users, setUsers] = useState<UserType[]>([])
  const [total, setTotal] = useState<number>(0)

  const { newData } = useRealtime<UserType>({ table: 'users' })

  useEffect(() => {
    if (newData) {
      setUsers((prevUsers) => [newData as UserType, ...(prevUsers || [])])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  const listAll = async () => {
    setLoading(true)
    listAllAction()
      .then(({ data, count }) => {
        setAllUsers(data)
        setTotal(count as number)
      })
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const list = async ({ currentPage, perPage }: { currentPage?: number; perPage?: number }) => {
    setLoading(true)
    listAction({ currentPage, perPage })
      .then(({ data, count }) => {
        setUsers(data)
        setTotal(count as number)
      })
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const states = {
    loading,
    message,
    users,
    total,
    allUsers
  }

  const methods = {
    list,
    listAll
  }

  return { ...states, ...methods }
}
