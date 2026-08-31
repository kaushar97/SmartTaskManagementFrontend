import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../hooks/useTasks";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useAuth } from "../../auth/hooks/useAuth";
import { useState } from "react";

export default function TaskListPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isWriter = user?.roles.includes("Writer") ?? false;

    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

    const {
        tasks,
        isLoading,
        error,
        refresh,
    } = useTasks();

    const {
        deleteTask,
        isDeleting,
        error: deleteError,
    } = useDeleteTask();

    const handleEdit = (publicId: string) => {
        navigate(`/tasks/${publicId}/edit`);
    };

    const handleDelete = async (publicId: string) => {
        if (!window.confirm("Delete this task?"))
            return;
        try {
            setDeletingTaskId(publicId);
            await deleteTask(publicId);
            await refresh();
        }
        finally {
            setDeletingTaskId(null);
        }
    }

    if (isLoading) {
        return (
            <div className="p-6">
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-600">
                    Unable to load tasks.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Tasks
                    </h1>

                    <p className="text-gray-600 mt-1">
                        Manage your tasks
                    </p>
                </div>

                {isWriter && (
                    <button
                        type="button"
                        onClick={() => navigate("/tasks/create")}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Create Task
                    </button>
                )}
            </div>

            {deleteError && (
                <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">
                    Unable to delete the task. Please try again.
                </div>
            )}

            {!tasks || tasks.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                    <h2 className="text-lg font-semibold">
                        No tasks found
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Create your first task to get started.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.publicId}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            canEdit={isWriter}
                            canDelete={isWriter}
                            isDeleting={deletingTaskId === task.publicId}
                        />
                    ))}
                </div>
            )}

            {isDeleting && (
                <div className="mt-4 text-sm text-gray-600">
                    Deleting task...
                </div>
            )}
        </div>
    );
}
