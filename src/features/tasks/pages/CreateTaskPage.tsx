import { useNavigate } from "react-router-dom";
import CreateTaskForm from "../components/CreateTaskForm";
import { useCreateTask } from "../hooks/useCreateTask";
import type { CreateTaskFormData } from "../validation/createTaskSchema";

export default function CreateTaskPage() {
    const navigate = useNavigate();

    const {
        createTask,
        isSubmitting,
        error,
    } = useCreateTask();

    async function handleSubmit(data: CreateTaskFormData) {
        try {
            await createTask({
                title: data.title,
                description: data.description,
                priority: data.priority,
                dueDate: data.dueDate,
                assignedToPublicId: data.assignedToPublicId,
                status: "Open",
            });

            navigate("/tasks");
        } catch {
            // The hook exposes the error state.
            // Keeping the page here prevents navigation after a failed request.
        }
    }

    function handleCancel() {
        navigate("/tasks");
    }

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">

            {/* Page Header */}

            <div>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    <span aria-hidden="true">←</span>
                    Back to Tasks
                </button>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Create Task
                </h1>

                <p className="mt-2 text-sm text-slate-600">
                    Create a new task and assign it to a team member.
                </p>
            </div>

            {/* Server Error */}

            {error && (
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
                                Unable to create task
                            </p>

                            <p className="mt-1 text-sm text-red-700">
                                {error}
                            </p>
                        </div>

                    </div>
                </div>
            )}

            {/* Form */}

            <CreateTaskForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onCancel={handleCancel}
            />

        </div>
    );

}
