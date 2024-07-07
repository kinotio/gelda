import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: '' })
const model = 'claude-3-opus-20240229'

export { anthropic, model }
