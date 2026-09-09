import { useState } from "react";
import UserTable from "../components/UserTable";
import { useUpdateUserRole } from "../hooks/useUpdateUserRole";
import { useUserManagementUsers } from "../hooks/useUserManagementUsers";
import type { User } from "../models/updateUser";

const UserManagementPage = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        users,
        isLoading,
        error,
        refreshUsers,
    } = useUserManagementUsers();

    const {
        changeUserRole,
        updatingUserId,
    } = useUpdateUserRole();

    const handleChangeRole = async (user: User) => {
        const newRole =
            user.role === "Reader"
                ? "Writer"
                : "Reader";

        try {
            setErrorMessage(null);

            await changeUserRole(user.publicId, {
                role: newRole,
            });

            await refreshUsers();
        } catch {
            setErrorMessage(
                "Failed to update the user's role. Please try again."
            );
        }
    };

    if (isLoading) {
        return (
            <div className="mx-auto flex min-h-[300px] w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 text-gray-600">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />

                    <span className="text-sm font-medium">
                        Loading users...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    User Management
                </h1>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    Manage user roles and control access to Writer
                    features.
                </p>
            </div>

            {/* Update Error */}
            {errorMessage && (
                <div
                    role="alert"
                    className="flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    <span>{errorMessage}</span>

                    <button
                        type="button"
                        onClick={() => setErrorMessage(null)}
                        className="shrink-0 font-medium text-red-700 hover:text-red-900"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Users Table */}
            <UserTable
                users={users}
                updatingUserId={updatingUserId}
                onChangeRole={handleChangeRole}
            />
        </div>
    );
};

export default UserManagementPage;