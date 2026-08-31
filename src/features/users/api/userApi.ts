import { apiClient } from "../../../services/apiClient";
import type { AssignableUser } from "../models/assignableUser";

export const userApi = {
    async getAssignableUsers(): Promise<AssignableUser[]> {
        const response = await apiClient.get<AssignableUser[]>("/users");

        return response.data;
    },
};