import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Email is required") // Catches empty strings safely
    .pipe(
      z.email({ message: "Please enter a valid email address" }) // Validates the format
    ),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;