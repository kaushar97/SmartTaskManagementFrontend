import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(1, "First name is required.")
            .max(100, "First name cannot exceed 100 characters."),

        lastName: z
            .string()
            .trim()
            .max(100, "Last name cannot exceed 100 characters.")
            .optional(),

        username: z
            .string()
            .trim()
            .min(1, "Email is required.")
            .email("Please enter a valid email address."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters."),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password.")
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"]
        }
    );