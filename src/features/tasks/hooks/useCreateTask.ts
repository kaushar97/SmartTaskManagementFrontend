import { useState } from "react";
import { taskApi } from "../api/taskApi";
import type { CreateTaskRequest } from "../models/createTaskRequest";
import type { Task } from "../models/task";

export const useCreateTask = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTask = async (
    request: CreateTaskRequest
    ): Promise<Task> => {
    setIsSubmitting(true);
    setError(null);

    try {
        return await taskApi.createTask(request);
    }
    catch {
        setError("Unable to create task.");
        throw new Error("Task creation failed.");
    }
        finally {
        setIsSubmitting(false);
        }
    };
    return {
    createTask,
    isSubmitting,
    error,
    };
}