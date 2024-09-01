import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

type HandleNewValueType = (payload: any) => void

const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  cookies: {
    getAll() {
      return cookies().getAll()
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => cookies().set(name, value, options))
      } catch {
        // The `setAll` method was called from a Server Component.
        // This can be ignored if you have middleware refreshing
        // user sessions.
      }
    }
  }
})

export const onInsertListener = ({
  tableName,
  handleNewValue
}: {
  tableName: string
  handleNewValue: HandleNewValueType
}) => {
  return supabase
    .channel(`public:${tableName}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: tableName }, (payload) =>
      handleNewValue(payload.new)
    )
    .subscribe() as any
}

export const onDeleteListener = ({
  tableName,
  handleNewValue
}: {
  tableName: string
  handleNewValue: HandleNewValueType
}) => {
  return supabase
    .channel(`public:${tableName}`)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: tableName }, (payload) =>
      handleNewValue(payload.old)
    )
    .subscribe() as any
}

export const removeListener = ({ listener }: { listener: any }) => {
  supabase.removeChannel(supabase.channel(listener))
}

export { supabase }
