import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='icon'
      variant='ghost'
      className='rounded-full'
    >
      <div className='flex gap-2 dark:hidden justify-center items-center'>
        <Moon size={20} />
      </div>

      <div className='dark:flex gap-2 hidden justify-center items-center'>
        <Sun size={20} />
      </div>

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
