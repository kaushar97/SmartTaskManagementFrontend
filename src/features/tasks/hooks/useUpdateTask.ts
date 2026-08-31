import { useState } from "react";
import { taskApi } from "../api/taskApi";
import type { UpdateTaskRequest } from "../models/updateTaskRequest";

export function useUpdateTask() {
    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    async function updateTask(
        publicId: string,
        request: UpdateTaskRequest
    ) {
        setIsSubmitting(true);
        setError(null);

        try {
            await taskApi.updateTask(
                publicId,
                request
            );
        } catch {
            setError("Unable to update task.");

            throw new Error(
                "Task update failed."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        updateTask,
        isSubmitting,
        error,
    };
}