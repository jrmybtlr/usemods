import { z } from "zod"

export default defineEventHandler((event) => {
  
  const { message } = z.object({
    message: z.string()
  }).parse(getQuery(event))

  return {
    message,
  }
})