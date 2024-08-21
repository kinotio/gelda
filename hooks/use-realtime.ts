import { useState, useEffect } from 'react'

import { onInsertListener, removeListener } from '@/lib/supabase/client'

export const useRealtime = ({ table }: { table: string }) => {
  const [newData, handleNewData] = useState()

  useEffect(() => {
    const listener = onInsertListener({
      tableName: table,
      handleNewValue: handleNewData
    })
    return () => removeListener(listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { newData }
}