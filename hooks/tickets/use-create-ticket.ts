import { useState } from 'react'

import { TicketInformationFormType } from '@/lib/definitions'
import { STATUS_BY_NAME, TOKEN_NAME } from '@/lib/constants'

import { create } from '@/server/actions/tickets'

import { useUser } from '@/hooks/users/use-user'

export function useCreateTicket() {
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const { user } = useUser()

  const createTicket = async (form: TicketInformationFormType) => {
    setLoading(true)
    try {
      const { title, description, priorityId } = form
      const ticket = {
        title: title.trim(),
        description: description.trim(),
        priorityId,
        statusId: STATUS_BY_NAME.OPEN,
        creatorId: user?.id as string
      }
      const { success, message } = await create(ticket)
      if (success) {
        setMessage(message)
        setSuccess(success)
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'An error occurred during creating ticket.'
      )
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return { createTicket, message, success, loading }
}
