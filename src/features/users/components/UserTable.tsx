import { ShieldCheck, UserRound, ArrowDown, ArrowUp } from "lucide-react";
import type { User } from "../models/updateUser";

interface UserTableProps {
    users: User[];
    updatingUserId: string | null;
    onChangeRole: (user: User) => void;
}

const UserTable = ({
    users,
    updatingUserId,
    onChangeRole,
}: UserTableProps) => {
    const getRoleBadgeClass = (role: string) => {
        switch (role) {
            case "Writer":
                return "bg-blue-100 text-blue-800";

            case "Reader":
                return "bg-gray-100 text-gray-800";

            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                        >
                            Full Name
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                        >
                            Email
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                        >
                            Role
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
                        >
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((user) => {
                        const isUpdating =
                            updatingUserId === user.publicId;

                        const isReader = user.role === "Reader";

                        return (
                            <tr
                                key={user.publicId}
                                className="transition-colors hover:bg-gray-50"
                            >
                                {/* Full Name */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                                            <UserRound
                                                size={18}
                                                className="text-gray-600"
                                            />
                                        </div>

                                        <span className="font-medium text-gray-900">
                                            {user.fullName}
                                        </span>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                    {user.email}
                                </td>

                                {/* Role */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getRoleBadgeClass(
                                            user.role
                                        )}`}
                                    >
                                        {isReader ? (
                                            <UserRound size={14} />
                                        ) : (
                                            <ShieldCheck size={14} />
                                        )}

                                        {user.role}
                                    </span>
                                </td>

                                {/* Action */}
                                <td className="whitespace-nowrap px-6 py-4 text-right">
                                    <button
                                        type="button"
                                        onClick={() => onChangeRole(user)}
                                        disabled={isUpdating}
                                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                                            isReader
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-gray-700 hover:bg-gray-800"
                                        }`}
                                    >
                                        {isUpdating ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Updating...
                                            </>
                                        ) : isReader ? (
                                            <>
                                                <ArrowUp size={16} />
                                                Promote to Writer
                                            </>
                                        ) : (
                                            <>
                                                <ArrowDown size={16} />
                                                Demote to Reader
                                            </>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}

                    {users.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-6 py-12 text-center"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <UserRound
                                        size={32}
                                        className="text-gray-400"
                                    />

                                    <p className="text-sm font-medium text-gray-700">
                                        No users found.
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        There are currently no users to
                                        display.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;