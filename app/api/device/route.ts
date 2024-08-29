import { NextApiRequest } from 'next'

import { getDeviceType } from '@/lib/utils'

export async function GET(request: NextApiRequest) {
  const device = getDeviceType(request)
  const data = { device }
  return new Response(JSON.stringify(data), { status: 200 })
}
