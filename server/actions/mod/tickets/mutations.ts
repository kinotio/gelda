'use server'

import { response } from '@/server/lib/helpers'
import { database } from '@/server/config/database'
import { tickets } from '@/server/config/schema'
import { TicketInformationType } from '@/lib/definitions'
import { ticketFormSchemaValidator } from '@/server/lib/validators'

export const createTicketMutation = async (form: TicketInformationType) => {
  const { success } = ticketFormSchemaValidator.safeParse(form)
  if (!success) {
    return response(
      false,
      'Submission failed: The provided data does not meet the required specifications. Please review and try again.'
    )
  }

  try {
    const data = await database.insert(tickets).values(form)
    return response(true, 'Ticket created successfully', data)
  } catch (error) {
    return response(false, 'An error occurred while creating a ticket')
  }
}
