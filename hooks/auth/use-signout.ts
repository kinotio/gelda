import { useRouter } from 'next/navigation'

import { PATH, TOKEN_NAME } from '@/lib/constants'
import { useCookie } from '@/hooks/shared/use-cookie'
import { CookieOptionsType } from '@/lib/definitions'

export const useSignout = () => {
  const [_, setUserToken] = useCookie(TOKEN_NAME, '') as [
    string,
    (value: string, options: CookieOptionsType) => void
  ]

  const router = useRouter()

  const signOut = () => {
    setUserToken('', { days: 0, path: '/', SameSite: 'Strict', Secure: true })
    router.push(PATH.SIGNIN)
  }

  return { signOut }
}
