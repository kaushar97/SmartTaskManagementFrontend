import type { Task } from "../models/task";

interface TaskCardProps {
    task: Task;
    onEdit: (publicId: string) => void;
    onDelete: (publicId: string) => void;
    canEdit: boolean;
    canDelete: boolean;
    isDeleting?: boolean;
}

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    canEdit,
    canDelete,
    isDeleting = false,
}: TaskCardProps) {
    const formattedDueDate = task.dueDate
        ? new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          }).format(new Date(task.dueDate))
        : "No due date";

    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">
                {task.title}
            </h2>

            <p className="text-gray-700 mb-4">
                {task.description || "No description"}
            </p>

            <div className="space-y-2 text-sm">
                <p>
                    <strong>Priority:</strong> {task.priority}
                </p>

                <p>
                    <strong>Status:</strong> {task.status}
                </p>

                <p>
                    <strong>Due Date:</strong> {formattedDueDate}
                </p>

                <p>
                    <strong>Assigned User:</strong>{" "}
                    {task.assignedToName ?? "Unassigned"}
                </p>
            </div>

            <div className="flex gap-2 mt-6">
                {canEdit && (
                    <button
                        type="button"
                        onClick={() => onEdit(task.publicId)}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                        disabled={isDeleting}
                    >
                    Edit
                </button>
                )}

                {canDelete && (
                    <button
                        type="button"
                        onClick={() => onDelete(task.publicId)}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                )}
            </div>
        </div>
    );
}