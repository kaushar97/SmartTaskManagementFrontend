import { useCallback, useEffect, useState } from "react";
import { taskApi } from "../api/taskApi";
import type { Task } from "../models/task";

export function useTask(publicId: string) {
    const [task, setTask] = useState<Task | null>(null);

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const refresh = useCallback(async () => {
        if (!publicId) return;

        setIsLoading(true);
        setError(null);

        try {
            const response =
                await taskApi.getTask(publicId);

            setTask(response);
        } catch {
            setError("Unable to load task.");
        } finally {
            setIsLoading(false);
        }
    }, [publicId]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        task,
        isLoading,
        error,
        refresh,
    };
}