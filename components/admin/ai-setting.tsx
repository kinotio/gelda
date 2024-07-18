'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const FormSchema = z.object({
  provider: z.enum(['openai', 'anthropic'], {
    required_error: 'You need to select a api key provider type.'
  }),
  model: z.enum(['gpt-4o', 'gpt-3.5', 'claude-3.5-sonnet', 'claude-3-opus'], {
    required_error: 'You need to specify a model'
  }),
  apiKey: z.string({ required_error: 'You need to enter the api key provided by the provider' })
})

const providerOpts = [
  {
    label: 'OpenAI',
    value: 'openai'
  },
  {
    label: 'Anthropic',
    value: 'anthropic'
  }
]

const modelOpts = [
  {
    label: 'GPT-4o',
    value: 'gpt-4o'
  },
  {
    label: 'GPT-3.5',
    value: 'gpt-3.5'
  },
  {
    label: 'Claude-3.5-Sonnet',
    value: 'claude-3.5-sonnet'
  },
  {
    label: 'Claude-3-Opus',
    value: 'claude-3-opus'
  }
]

const AiSettings = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className='w-2/3 space-y-6'>
            <FormField
              control={form.control}
              name='provider'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Provider</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {providerOpts.map((opt) => (
                        <FormItem key={opt.value} className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={opt.value} />
                          </FormControl>
                          <FormLabel className='font-normal'>{opt.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      {modelOpts.map((opt) => (
                        <FormItem key={opt.value} className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={opt.value} />
                          </FormControl>
                          <FormLabel className='font-normal'>{opt.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='apiKey'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input
                      id='apiKey'
                      type='apiKey'
                      placeholder='Your api key'
                      onChange={field.onChange}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}

export { AiSettings }
