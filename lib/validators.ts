import z from 'zod'

export const ticketFormSchemaValidator = z.object({
  title: z.string().min(4, { message: 'Title is required' }),
  description: z.string(),
  priorityId: z.number({ message: 'PriorityId need to be number' }),
  statusId: z.number({ message: 'StatusId need to be number' }),
  creatorId: z.string({ message: 'CreatorId need to be string' })
})
