'use client'

import { useState } from 'react'

import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  getUser as getUserAction,
  updateProfileInformation as updateProfileInformationAction,
  getUserInboxesPreferences as getUserInboxesPreferencesAction,
  updateUserInboxesPreferences as updateUserInboxesPreferencesAction,
  getUserInboxes as getUserInboxesAction,
  updatePassword as updatePasswordAction
} from '@/server/actions/auth'

import {
  LoginFormType,
  RegisterFormType,
  UserType,
  UpdateProfileInformationFormType,
  InboxesPreferencesType,
  InboxeType,
  UpdatePasswordFormType
} from '@/lib/definitions'

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [authenticatedUser, setAuthenticatedUser] = useState<UserType | null>()
  const [inboxesPreferences, setInboxesPreferences] = useState<InboxesPreferencesType[] | null>()
  const [inboxes, setInboxes] = useState<InboxeType[]>([])

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

  const getUserInboxesPreferences = async () => {
    setLoading(true)
    getUserInboxesPreferencesAction()
      .then((data) => setInboxesPreferences(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const updateUserInboxesPreferences = async (preference: string) => {
    setLoading(true)
    updateUserInboxesPreferencesAction(preference)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const getUserInboxes = async () => {
    setLoading(true)
    getUserInboxesAction()
      .then((data) => setInboxes(data))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const updatePassword = async (form: UpdatePasswordFormType) => {
    setLoading(true)
    updatePasswordAction(form)
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false))
  }

  const states = {
    message,
    loading,
    authenticatedUser,
    inboxesPreferences,
    inboxes
  }

  const methods = {
    login,
    register,
    logout,
    authenticate,
    updateProfileInformation,
    getUserInboxesPreferences,
    updateUserInboxesPreferences,
    getUserInboxes,
    updatePassword
  }

  return { ...states, ...methods }
}
