import { priorityColors, statusColors } from "../constants/taskColors";
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

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
             <div className="flex items-start justify-between">

                <h2 className="text-xl font-semibold text-slate-900">
                    {task.title}
                </h2>

            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
                {task.description || "No description provided."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColors[task.priority]}`}
                >
                    {task.priority}
                </span>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[task.status]}`}
                >
                    {task.status}
                </span>

            </div>
<div className="mt-5 space-y-2 text-sm text-slate-600">

                <p>

                    <span className="font-medium">
                        Assigned:
                    </span>{" "}
                    {task.assignedToName}

                </p>

                <p>

                    <span className="font-medium">
                        Due:
                    </span>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}

                </p>

            </div>

           {(canEdit || canDelete) && (

                <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">

                    {canEdit && (

                        <button
                            onClick={() => onEdit(task.publicId)}
                            className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                            Edit
                        </button>

                    )}

                    {canDelete && (

                        <button
                            onClick={() => onDelete(task.publicId)}
                            disabled={isDeleting}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isDeleting
                                ? "Deleting..."
                                : "Delete"}
                        </button>

                    )}

                </div>

            )}
        </div>
    );
}