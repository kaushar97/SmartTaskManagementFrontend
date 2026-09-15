import { apiClient } from "../../../services/apiClient";
import type { AssignableUser } from "../models/assignableUser";
import type { User } from "../models/updateUser";
import type { UpdateUserRoleRequest } from "../models/updateUserRoleRequest";

export const userApi = {
    async getAssignableUsers(): Promise<AssignableUser[]> {
        const response = await apiClient.get<AssignableUser[]>("/users");

        return response.data;
    },
};

export const getUserManagementUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users/userManagement");

    return response.data;
};

export const updateUserRole = async (
    publicId: string,
    request: UpdateUserRoleRequest
): Promise<User> => {
    const response = await apiClient.patch<User>(
        `${"/users"}/${publicId}/role`,
        request
    );

    return response.data;
};