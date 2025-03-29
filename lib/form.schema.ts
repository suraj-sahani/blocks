import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password should have atleast 8 characters")
    .max(20, "Password cannot have more that 20 characters."),
  imageUrl: z.string().optional(),
  terms_conditions: z.boolean(),
});

export const signUpDV: z.infer<typeof signUpSchema> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  imageUrl: "",
  terms_conditions: false,
};
