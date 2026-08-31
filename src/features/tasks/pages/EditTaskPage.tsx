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
    } = useUpdateTask();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!task) {
        return <p>Task not found.</p>;
    }

    async function handleSubmit(
        data: CreateTaskFormData
    ) {

        await updateTask(task!.publicId, {

            title: data.title,

            status: data.status,

            priority: data.priority,

            dueDate: data.dueDate,

            assignToPublicId:
                data.assignedToPublicId,

        });

        navigate("/tasks");

    }

    return (

        <EditTaskForm

            initialValues={{

                title: task.title,

                description: task.description,

                status: task.status,

                priority: task.priority,

                dueDate: task.dueDate
                    .split("T")[0],

                assignedToPublicId:
                    task.assignedToPublicId,

            }}

            onSubmit={handleSubmit}

            isSubmitting={isSubmitting}

        />

    );

}