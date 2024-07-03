import OpenAi from 'openai'

if (!process.env.OPENAI_API_KEY)
  throw new Error('An error occurred OPENAI_API_KEY is not defined in .env file')

const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY })
const model = 'gpt-3.5-turbo'

export { openai, model }
