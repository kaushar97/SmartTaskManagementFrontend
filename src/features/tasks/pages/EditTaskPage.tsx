import { useNavigate, useParams } from "react-router-dom";

import EditTaskForm from "../components/EditTaskForm";
import { useTask } from "../hooks/useTask";
import { useUpdateTask } from "../hooks/useUpdateTask";
import type { CreateTaskFormData } from "../validation/createTaskSchema";

export default function EditTaskPage() {
const { publicId } = useParams();
const navigate = useNavigate();

const {
    task,
    isLoading,
    error,
} = useTask(publicId ?? "");

const {
    updateTask,
    isSubmitting,
    error: updateError,
} = useUpdateTask();

function handleCancel() {
    navigate("/tasks");
}

async function handleSubmit(data: CreateTaskFormData) {
    if (!task) {
        return;
    }

    try {
        await updateTask(task.publicId, {
            title: data.title,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate,
            assignToPublicId: data.assignedToPublicId,
        });

        navigate("/tasks");
    } catch {
        // The update hook exposes the error state.
        // Staying on the page allows the user to correct/retry the update.
    }
}

if (isLoading) {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">

            <div>
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

                <div className="mt-4 h-9 w-48 animate-pulse rounded bg-slate-200" />

                <div className="mt-2 h-5 w-80 max-w-full animate-pulse rounded bg-slate-200" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                    <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-4 w-64 max-w-full animate-pulse rounded bg-slate-200" />
                </div>

                <div className="space-y-6 px-6 py-8 sm:px-8">

                    <div className="h-11 animate-pulse rounded-lg bg-slate-100" />

                    <div className="h-32 animate-pulse rounded-lg bg-slate-100" />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="h-11 animate-pulse rounded-lg bg-slate-100" />
                        <div className="h-11 animate-pulse rounded-lg bg-slate-100" />
                    </div>

                    <div className="h-11 animate-pulse rounded-lg bg-slate-100" />

                </div>

            </div>
        </div>
    );
}

if (error) {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">

            <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
                <span aria-hidden="true">←</span>
                Back to Tasks
            </button>

            <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm"
            >
                <div className="flex items-start gap-3">

                    <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700"
                        aria-hidden="true"
                    >
                        !
                    </div>

                    <div>
                        <h1 className="font-semibold text-red-800">
                            Unable to load task
                        </h1>

                        <p className="mt-1 text-sm text-red-700">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                        >
                            Return to Tasks
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

if (!task) {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">

            <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
                <span aria-hidden="true">←</span>
                Back to Tasks
            </button>

            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500">
                    ?
                </div>

                <h1 className="mt-4 text-xl font-semibold text-slate-900">
                    Task not found
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    The task you are trying to edit could not be found.
                </p>

                <button
                    type="button"
                    onClick={handleCancel}
                    className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                    Return to Tasks
                </button>

            </div>
        </div>
    );
}

return (
    <div className="mx-auto w-full max-w-4xl space-y-6">

        {/* Page Header */}

        <div>
            <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <span aria-hidden="true">←</span>
                Back to Tasks
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Edit Task
            </h1>

            <p className="mt-2 text-sm text-slate-600">
                Update the task details, status, priority, and assignment.
            </p>
        </div>

        {/* Update Error */}

        {updateError && (
            <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
                <div className="flex items-start gap-3">

                    <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700"
                        aria-hidden="true"
                    >
                        !
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-red-800">
                            Unable to update task
                        </p>

                        <p className="mt-1 text-sm text-red-700">
                            {updateError}
                        </p>
                    </div>

                </div>
            </div>
        )}

        <EditTaskForm
            initialValues={{
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate.split("T")[0],
                assignedToPublicId: task.assignedToPublicId,
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
        />

    </div>
);

}
