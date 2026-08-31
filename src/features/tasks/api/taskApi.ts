import type { Task } from "../models/task";
import type { CreateTaskRequest } from "../models/createTaskRequest";
import type { UpdateTaskRequest } from "../models/updateTaskRequest";
import { apiClient } from "../../../services/apiClient";

export const taskApi = {
    async getTasks(): Promise<Task[]> {
        const response = await apiClient.get<Task[]>("/tasks");
        return response.data;
    },

    async getMyTasks(): Promise<Task[]> {
        const response = await apiClient.get<Task[]>("/users/my");
        return response.data;
    },

    async getTask(publicId: string): Promise<Task> {
        const response = await apiClient.get<Task>(`/tasks/${publicId}`);
        return response.data;
    },

    async createTask(request: CreateTaskRequest): Promise<Task> {
        const response = await apiClient.post<Task>("/tasks", request);
        return response.data;
    },

    async updateTask(
        publicId: string,
        request: UpdateTaskRequest
    ): Promise<Task> {
        const response = await apiClient.put<Task>(
            `/tasks/${publicId}`,
            request
        );

        return response.data;
    },

    async deleteTask(publicId: string): Promise<void> {
        await apiClient.delete(`/tasks/${publicId}`);
    }
};
