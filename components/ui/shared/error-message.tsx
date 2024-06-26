import { InfoIcon } from 'lucide-react'

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='flex gap-2 items-center pt-2'>
      <InfoIcon className='text-red-500 size-4' />
      <span className='text-red-500 text-sm'>{message}</span>
    </div>
  )
}
