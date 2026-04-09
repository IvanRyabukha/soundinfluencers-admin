import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {error: "Email is required"})
    .pipe(z.email("Invalid email address")),
  password: z
    .string()
    .trim()
    .min(1, {error: "Password is required"}),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;
