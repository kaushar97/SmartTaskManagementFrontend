import TaskCard from "../components/TaskCard";
import { useMyTasks } from "../hooks/useMyTasks";

export default function MyTasksPage() {
    const {
        tasks,
        isLoading,
        error,
    } = useMyTasks();

    if (isLoading) {
        return (
            <div className="p-6">
                Loading your tasks...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600">
                {error}
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    My Tasks
                </h2>

                <p className="mt-2 text-gray-600">
                    You don't have any assigned tasks.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                My Tasks
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {tasks.map(task => (
                    <TaskCard
                        key={task.publicId}
                        task={task}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        canEdit={false}
                        canDelete={false}
                    />
                ))}
            </div>
        </div>
    );
}
