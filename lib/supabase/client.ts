import { createBrowserClient } from '@supabase/ssr'

const createClient = () => {
  return createBrowserClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
}

const supabase = createClient()

export const onInsertListener = (tableName: string, handleNewValue: Function) => {
  return supabase
    .channel(`public:${tableName}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: tableName }, (payload) =>
      handleNewValue(payload.new)
    )
    .subscribe() as any
}

export const onDeleteListener = (tableName: string, handleNewValue: Function) => {
  return supabase
    .channel(`public:${tableName}`)
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: tableName }, (payload) =>
      handleNewValue(payload.old)
    )
    .subscribe() as any
}

export const removeListener = (listener: any) => {
  supabase.removeChannel(supabase.channel(listener))
}

export { supabase }
