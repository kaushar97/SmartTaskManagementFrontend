import { useState } from "react";
import type { UpdateUserRoleRequest } from "../models/updateUserRoleRequest";
import { updateUserRole } from "../api/userApi";

export const useUpdateUserRole = () => {
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

    const changeUserRole = async (
        publicId: string,
        request: UpdateUserRoleRequest
    ) => {
        try {
            setUpdatingUserId(publicId);

            return await updateUserRole(publicId, request);
        } finally {
            setUpdatingUserId(null);
        }
    };

    return {
        changeUserRole,
        updatingUserId,
    };
};