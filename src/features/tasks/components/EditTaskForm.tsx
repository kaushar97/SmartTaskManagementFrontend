import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    createTaskSchema,
    type CreateTaskFormData,
} from "../validation/createTaskSchema";

import { TaskPriorities } from "../constants/taskPriority";
import { TaskStatuses } from "../constants/taskStatus";

import { useAssignableUsers } from "../../users/hooks/useAssignableUsers";

type EditTaskFormProps = {
    initialValues: CreateTaskFormData;
    isSubmitting: boolean;
    onSubmit: (
        data: CreateTaskFormData
    ) => Promise<void>;
};

export default function EditTaskForm({
    initialValues,
    onSubmit,
    isSubmitting,
}: EditTaskFormProps) {

    const {
        users,
    } = useAssignableUsers();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateTaskFormData>({
        resolver: zodResolver(createTaskSchema),
    });

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label>Title</label>

                <input
                    {...register("title")}
                />

                <p>{errors.title?.message}</p>
            </div>

            <div>
                <label>Description</label>

                <textarea
                    {...register("description")}
                />

                <p>{errors.description?.message}</p>
            </div>

            <div>
                <label>Status</label>

                <select
                    {...register("status")}
                >
                    {TaskStatuses.map(status => (
                        <option
                            key={status}
                            value={status}
                        >
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Priority</label>

                <select
                    {...register("priority")}
                >
                    {TaskPriorities.map(priority => (
                        <option
                            key={priority}
                            value={priority}
                        >
                            {priority}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Due Date</label>

                <input
                    type="date"
                    {...register("dueDate")}
                />
            </div>

            <div>
                <label>Assign To</label>

                <select
                    {...register("assignedToPublicId")}
                >
                    {users.map(user => (
                        <option
                            key={user.publicId}
                            value={user.publicId}
                        >
                            {user.fullName}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
            >
                Save Changes
            </button>

        </form>
    );
}