import { useState, useEffect } from 'react'

import { ask } from '@/server/actions/shared/ai'

export const useAi = () => {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const { content } = await ask()
        setContent(content)
      } catch (e) {
        console.log('An error occured while processing chat completion')
      }
    }

    fetch()
  }, [])

  return { content }
}
