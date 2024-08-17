'use client'

import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  getUser as getUserAction
} from '@/server/actions/auth'

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>()

  useEffect(() => {
    authenticate()
  }, [])

  const login = async (form: { email: string; password: string }) => {
    setLoading(true)
    loginAction(form)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const register = async (form: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    setLoading(true)
    registerAction(form)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    logoutAction()
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const authenticate = async () => {
    setLoading(true)
    getUserAction()
      .then((data) => setAuthenticatedUser(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  return { login, register, logout, authenticate, message, loading, authenticatedUser }
}
