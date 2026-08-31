import { useCallback, useEffect, useState } from "react";
import { taskApi } from "../api/taskApi";
import type { Task } from "../models/task";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await taskApi.getTasks();

            setTasks(response);
        }
        catch {
            setError("Unable to load tasks.");
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
      refresh();
    }, [refresh]);

    return {
        tasks,
        isLoading,
        error,
        refresh,
    };
};