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
};

export default function CreateTaskForm({
    onSubmit,
    isSubmitting,
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
    });

    if (loadingUsers) {
        return <p>Loading users...</p>;
    }

    if (usersError) {
        return <p>{usersError}</p>;
    }

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
                <label>Priority</label>

                <select {...register("priority")}>
                        <option value="">
                            Select Priority
                        </option>

                        {TaskPriorities.map(priority => (
                            <option
                                key={priority}
                                value={priority}
                            >
                                {priority}
                            </option>
                        ))}
                </select>

                <p>{errors.priority?.message}</p>
            </div>

            <div>
                <label>Due Date</label>

                <input
                    type="date"
                    {...register("dueDate")}
                />

                <p>{errors.dueDate?.message}</p>
            </div>

            <div>
                <label>Assign To</label>

                <select
                    {...register("assignedToPublicId")}
                >
                    <option value="">
                        Select User
                    </option>

                    {users.map(user => (
                        <option
                            key={user.publicId}
                            value={user.publicId}
                        >
                            {user.fullName}
                        </option>
                    ))}
                </select>

                <p>
                    {errors.assignedToPublicId?.message}
                </p>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Creating..."
                    : "Create Task"}
            </button>
        </form>
    );
}