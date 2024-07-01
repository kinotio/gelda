import { useState, useEffect } from 'react'

import { TicketInformationFromRealtimeType } from '@/lib/definitions'
import { onInsertListener, removeListener } from '@/lib/supabase'

export const useRealtimeTicket = () => {
  const [newTicket, handleNewTicket] = useState<TicketInformationFromRealtimeType>()

  useEffect(() => {
    const ticketListener = onInsertListener('tickets', handleNewTicket)
    return () => removeListener(ticketListener)
  }, [])

  return { newTicket }
}
