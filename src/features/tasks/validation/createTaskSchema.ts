import { z } from "zod";
import { TaskPriorities } from "../constants/taskPriority";
import { TaskStatuses } from "../constants/taskStatus";

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters.")
        .max(100, "Title cannot exceed 100 characters."),

    description: z
        .string()
        .trim()
        .min(1, "Description is required.")
        .max(3000, "Description cannot exceed 3000 characters."),

    priority: z.enum(TaskPriorities, {
        error: "Priority is required.",
    }),

    status: z.enum(TaskStatuses, {
        error: "Status is required.",
    }),

    dueDate: z.string().min(1, "Due date is required."),

    assignedToPublicId: z
        .string()
        .uuid("Please select a valid user."),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;