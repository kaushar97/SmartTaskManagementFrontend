import { useNavigate } from "react-router-dom";
import CreateTaskForm from "../components/CreateTaskForm";
import { useCreateTask } from "../hooks/useCreateTask";
import type { CreateTaskFormData } from "../validation/createTaskSchema";

export default function CreateTaskPage() {
    const navigate = useNavigate();

    const {
        createTask,
        isSubmitting,
    } = useCreateTask();

    async function handleSubmit(
        data: CreateTaskFormData
    ) {
        await createTask({
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate,
            assignedToPublicId:
                data.assignedToPublicId,

            status: "Open",
        });

        navigate("/tasks");
    }

    return (
        <CreateTaskForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
        />
    );
}