import { useState, useEffect } from 'react'
import { Subject, filter } from 'rxjs'

import { Event } from '@/lib/definitions'

const eventBus = new Subject<Event>()

export const useEvents = (predicateFn: (event: Event) => boolean) => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const subscription = eventBus.pipe(filter(predicateFn)).subscribe((event) => {
      setEvents((prevEvents) => [...prevEvents, event])
    })

    return () => subscription.unsubscribe()
  }, [predicateFn])

  const publish = (event: Event) => eventBus.next(event)

  return { events, publish }
}
