import { z } from "zod";

const optionalTextField = (label: string, min = 2, max = 50) =>
  z
  .string()
  .trim()
  .refine((value) => value === "" || value.length >= min, {
    message: `${label} must be at least ${min} characters`,
  })
  .refine((value) => value === "" || value.length <= max, {
    message: `${label} must be at most ${max} characters`,
  });

export const influencerAccountDetailsSchema = z.object({
  firstName: optionalTextField("First name"),
  lastName: optionalTextField("Last name"),

  email: z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.email().safeParse(value).success,
    {
      message: "Enter a valid email",
    },
  )
  .refine((value) => value === "" || value.length <= 100, {
    message: "Email must be at most 100 characters",
  }),

  phone: z
  .string()
  .trim()
  .refine((value) => value === "" || value.length >= 6, {
    message: "Phone number is too short",
  })
  .refine((value) => value === "" || value.length <= 30, {
    message: "Phone number is too long",
  })
  .refine((value) => value === "" || /^[+]?[0-9()\-\s]+$/.test(value), {
    message: "Enter a valid phone number",
  }),
});

export type InfluencerAccountDetailsFormValues = z.infer<
  typeof influencerAccountDetailsSchema
>;
