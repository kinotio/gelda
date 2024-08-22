'use client'

import { useState } from 'react'

import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  getUser as getUserAction,
  updateProfileInformation as updateProfileInformationAction
} from '@/server/actions/auth'

import {
  LoginFormType,
  RegisterFormType,
  UserType,
  UpdateProfileInformationFormType
} from '@/lib/definitions'

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [authenticatedUser, setAuthenticatedUser] = useState<UserType | null>()

  const login = async (form: LoginFormType) => {
    setLoading(true)
    loginAction(form)
      .then(() => window.location.reload())
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const register = async (form: RegisterFormType) => {
    setLoading(true)
    registerAction(form)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    logoutAction()
      .then(() => window.location.reload())
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

  const updateProfileInformation = async (form: UpdateProfileInformationFormType) => {
    setLoading(true)
    updateProfileInformationAction(form)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  return {
    login,
    register,
    logout,
    authenticate,
    message,
    loading,
    authenticatedUser,
    updateProfileInformation
  }
}
