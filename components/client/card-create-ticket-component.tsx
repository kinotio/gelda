import { PlusIcon, SendIcon } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function CardCreateTicketComponent() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Create Ticket</CardTitle>
        <PlusIcon className='w-4 h-4 text-gray-500 dark:text-gray-400' />
      </CardHeader>
      <CardContent className='h-[500px] overflow-auto'>
        <form>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='title'>Title</Label>
              <Input id='title' placeholder='Enter ticket title' />
            </div>
            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea id='description' placeholder='Describe the issue' rows={3} />
            </div>
            <div>
              <Label htmlFor='priority'>Priority</Label>
              <Select name='priority'>
                <SelectTrigger>
                  <SelectValue placeholder='Select priority' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='low'>Low</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='high'>High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className='w-full' type='submit'>
              Create Ticket
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
