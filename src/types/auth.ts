import {z} from "zod"

export const loginSchema = z.object({
  email: z.string().email().min(6, {
    message: "Email must be at least 2 characters.",
  }),
})

export type LoginForm = z.infer<typeof loginSchema>
