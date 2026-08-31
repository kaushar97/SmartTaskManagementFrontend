import { useState } from "react";
import { taskApi } from "../api/taskApi";

export function useDeleteTask() {

    const [isDeleting, setIsDeleting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    async function deleteTask(publicId: string) {

        setIsDeleting(true);
        setError(null);

        try {

            await taskApi.deleteTask(publicId);

        }
        catch {

            setError("Unable to delete task.");

            throw new Error("Delete failed.");

        }
        finally {

            setIsDeleting(false);

        }

    }

    return {

        deleteTask,

        isDeleting,

        error,

    };

}