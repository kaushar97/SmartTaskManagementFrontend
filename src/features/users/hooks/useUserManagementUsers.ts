import { useCallback, useEffect, useState } from "react";
import type { User } from "../models/updateUser";
import { getUserManagementUsers } from "../api/userApi";

export const useUserManagementUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await getUserManagementUsers();

            setUsers(data);
        } catch {
            setError("Failed to load users.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return {
        users,
        isLoading,
        error,
        refreshUsers: loadUsers,
    };
};