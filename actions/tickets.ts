'use server'

import { ticketsMethods as tickets } from '@/database'

import type { TTicket } from '@/types'

export async function getTickets() {
  try {
    const data = await tickets.get()
    return {
      success: true,
      data
    }
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred while fetching tickets'
    }
  }
}

export async function getTicketById(id: string) {
  try {
    const data = await tickets.getById(id)
    return {
      success: true,
      data
    }
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred while fetching a ticket'
    }
  }
}

export async function createTicket(form: TTicket) {
  try {
    const data = await tickets.create(form)
    return {
      success: true,
      data
    }
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred while creating a ticket'
    }
  }
}
