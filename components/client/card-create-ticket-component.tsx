'use client'

import { PlusIcon } from 'lucide-react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { AlertCircle } from 'lucide-react'

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

import { TicketInformationFormType } from '@/lib/definitions'

import { useCreateTicket } from '@/hooks/tickets/use-create-ticket'
import { usePriorities } from '@/hooks/priorities/use-priorities'

export default function CardCreateTicketComponent() {
  const { createTicket, loading, message, success } = useCreateTicket()
  const { priorities } = usePriorities()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<TicketInformationFormType>()

  const onSubmit: SubmitHandler<TicketInformationFormType> = (form: TicketInformationFormType) => {
    createTicket(form).finally(() => reset())
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Create Ticket</CardTitle>
        <PlusIcon className='w-4 h-4 text-gray-500 dark:text-gray-400' onClick={() => reset()} />
      </CardHeader>
      <CardContent className='h-[500px] overflow-auto'>
        {!success && message !== '' ? (
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div>
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
            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Describe the issue'
                rows={11}
                {...register('description')}
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
                      {priorities.map((priority) => (
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

            <Button className='w-full' type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Create Ticket'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
