import { z } from 'zod'

export const newLinkSchema = z.object({
  url: z.url({ message: 'must be a valid URL' }),
})
