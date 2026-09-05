import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    createTaskSchema,
    type CreateTaskFormData,
} from "../validation/createTaskSchema";

import { useAssignableUsers } from "../../users/hooks/useAssignableUsers";
import { TaskPriorities } from "../constants/taskPriority";

type CreateTaskFormProps = {
    isSubmitting: boolean;
    onSubmit: (data: CreateTaskFormData) => Promise<void>;
    onCancel: () => void;
};

export default function CreateTaskForm({
    onSubmit,
    isSubmitting,
    onCancel,
}: CreateTaskFormProps) {
    const {
        users,
        isLoading: loadingUsers,
        error: usersError,
    } = useAssignableUsers();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTaskFormData>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: undefined,
            status: "Open",
            dueDate: "",
            assignedToPublicId: "",
        },
    });

    if (loadingUsers) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-center gap-3 py-10">

                    <div
                        className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800"
                        aria-hidden="true"
                    />

                    <p className="text-sm font-medium text-slate-600">
                        Loading users...
                    </p>

                </div>
            </div>
        );
    }

    if (usersError) {
        return (
            <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm"
            >
                <h2 className="font-semibold text-red-800">
                    Unable to load users
                </h2>

                <p className="mt-1 text-sm text-red-700">
                    {usersError}
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
            {/* Form Header */}

            <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                <h2 className="text-lg font-semibold text-slate-900">
                    Task Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Provide the details below to create your task.
                </p>
            </div>

            {/* Form Fields */}

            <div className="space-y-6 px-6 py-6 sm:px-8">

                {/* Title */}

                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Title
                        <span className="ml-1 text-red-500" aria-hidden="true">
                            *
                        </span>
                    </label>

                    <input
                        id="title"
                        type="text"
                        autoComplete="off"
                        disabled={isSubmitting}
                        {...register("title")}
                        className={`mt-2 block w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${errors.title
                                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                            }`}
                        placeholder="Enter task title"
                    />

                    {errors.title && (
                        <p className="mt-1.5 text-sm text-red-600">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Description */}

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Description
                        <span className="ml-1 text-red-500" aria-hidden="true">
                            *
                        </span>
                    </label>

                    <textarea
                        id="description"
                        rows={5}
                        disabled={isSubmitting}
                        {...register("description")}
                        className={`mt-2 block w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${errors.description
                                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                            }`}
                        placeholder="Describe the task..."
                    />

                    {errors.description && (
                        <p className="mt-1.5 text-sm text-red-600">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Priority and Due Date */}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    {/* Priority */}

                    <div>
                        <label
                            htmlFor="priority"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Priority
                            <span className="ml-1 text-red-500" aria-hidden="true">
                                *
                            </span>
                        </label>

                        <select
                            id="priority"
                            disabled={isSubmitting}
                            {...register("priority")}
                            className={`mt-2 block w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${errors.priority
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                                }`}
                        >
                            <option value="">
                                Select Priority
                            </option>

                            {TaskPriorities.map((priority) => (
                                <option
                                    key={priority}
                                    value={priority}
                                >
                                    {priority}
                                </option>
                            ))}
                        </select>

                        {errors.priority && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.priority.message}
                            </p>
                        )}
                    </div>

                    {/* Due Date */}

                    <div>
                        <label
                            htmlFor="dueDate"
                            className="block text-sm font-medium text-slate-700"
                        >
                            Due Date
                            <span className="ml-1 text-red-500" aria-hidden="true">
                                *
                            </span>
                        </label>

                        <input
                            id="dueDate"
                            type="date"
                            disabled={isSubmitting}
                            {...register("dueDate")}
                            className={`mt-2 block w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${errors.dueDate
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                                }`}
                        />

                        {errors.dueDate && (
                            <p className="mt-1.5 text-sm text-red-600">
                                {errors.dueDate.message}
                            </p>
                        )}
                    </div>

                </div>

                {/* Assign User */}

                <div>
                    <label
                        htmlFor="assignedToPublicId"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Assign To
                        <span className="ml-1 text-red-500" aria-hidden="true">
                            *
                        </span>
                    </label>

                    <select
                        id="assignedToPublicId"
                        disabled={isSubmitting}
                        {...register("assignedToPublicId")}
                        className={`mt-2 block w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${errors.assignedToPublicId
                                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                            }`}
                    >
                        <option value="">
                            Select User
                        </option>

                        {users.map((user) => (
                            <option
                                key={user.publicId}
                                value={user.publicId}
                            >
                                {user.fullName}
                            </option>
                        ))}
                    </select>

                    {errors.assignedToPublicId && (
                        <p className="mt-1.5 text-sm text-red-600">
                            {errors.assignedToPublicId.message}
                        </p>
                    )}
                </div>

            </div>

            {/* Actions */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting && (
                        <span
                            className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-white"
                            aria-hidden="true"
                        />
                    )}

                    {isSubmitting
                        ? "Creating..."
                        : "Create Task"}
                </button>

            </div>
        </form>
    );

}
