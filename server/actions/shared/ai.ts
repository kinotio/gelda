'use server'

import { openai, model } from '@/server/lib/openai'

export const ask = async () => {
  let content = ''

  const stream = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true
  })

  for await (const chunk of stream) {
    // process.stdout.write(chunk.choices[0]?.delta?.content || '')
    content = chunk.choices[0]?.delta?.content as string
  }

  return { content }
}
