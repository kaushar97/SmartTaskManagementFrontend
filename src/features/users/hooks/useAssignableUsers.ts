import { useCallback, useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import type { AssignableUser } from "../models/assignableUser";

export function useAssignableUsers() {
    const [users, setUsers] = useState<AssignableUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await userApi.getAssignableUsers();

            setUsers(response);
        } catch {
            setError("Unable to load users.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        users,
        isLoading,
        error,
        refresh,
    };
}