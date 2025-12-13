import { z } from 'zod'

export const newBoxSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'required' })
    .regex(/^[a-zA-Z0-9 ]+$/, { message: 'only letters, numbers and spaces are allowed' })
    .max(80, { message: 'must be less than 80 characters' }),
  description: z
    .string()
    .min(3, { message: 'must be at least 3 characters' })
    .max(80, { message: 'must be less than 80 characters' })
    .optional()
    .or(z.literal('')),
})