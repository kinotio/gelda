'use client'

import { useEffect } from 'react'
import { PlusIcon, AlertCircle, TicketPlusIcon } from 'lucide-react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { isEmpty } from 'lodash'

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ErrorMessage } from '@/components/ui/shared/error-message'

import { TicketFormType } from '@/lib/definitions'

import { useTickets } from '@/hooks/use-tickets'

const Create = () => {
  const { create, loading, message, listTicketPriorities, ticketPriorities } = useTickets()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<TicketFormType>()

  const onSubmit: SubmitHandler<TicketFormType> = (form: TicketFormType) => {
    create(form).finally(() => reset())
  }

  useEffect(() => {
    listTicketPriorities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium flex items-center gap-2'>
          <TicketPlusIcon size={20} />
          <span className='text-xl font-bold'>Create Ticket</span>
        </CardTitle>
        <Button className='rounded-full' size='icon' variant='ghost' onClick={() => reset()}>
          <PlusIcon className='w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer' />
          <span className='sr-only'>New ticket</span>
        </Button>
      </CardHeader>
      <CardContent className='overflow-auto'>
        {!isEmpty(message) ? (
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                placeholder='Enter ticket title'
                {...register('title', {
                  required: 'Title is required'
                })}
              />
              {errors.title && <ErrorMessage message={errors.title.message as string} />}
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Describe the issue'
                rows={27}
                {...register('description')}
                className='resize-none'
              />
            </div>
            <div>
              <Controller
                control={control}
                name='priorityId'
                rules={{ required: 'Priority is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className='capitalize'>
                      <SelectValue placeholder='Select priority' />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketPriorities.map((priority) => (
                        <SelectItem
                          className='capitalize'
                          key={priority.id}
                          value={priority.id.toString()}
                        >
                          {priority.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priorityId && <ErrorMessage message={errors.priorityId.message as string} />}
            </div>

            <Button className='w-1/5' type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Create Ticket'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export { Create }
