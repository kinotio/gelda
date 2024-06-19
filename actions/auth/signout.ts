'use server'

import { response } from '@/utils/response'

export async function signout() {
  return response(true, 'Sign out successful: You are now signed out.')
}
