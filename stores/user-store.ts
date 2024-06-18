import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  user: string
  setUser: (content: string) => void
}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      user: '',
      setUser: (user: string) => set({ user })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useUserStore
