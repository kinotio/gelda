import { NextApiRequest } from 'next'

import { getDeviceType } from '@/lib/utils'

export async function GET(request: NextApiRequest) {
  try {
    const device = getDeviceType(request)
    const data = { device }
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve device type' }), {
      status: 500
    })
  }
}
