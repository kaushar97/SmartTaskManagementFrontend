import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "../hooks/useRegister";

import type {
    RegisterFormData,
    RegisterRequest,
} from "../types/auth.types";

import { registerSchema } from "../validation/registerSchema";

interface RegisterFormProps {
    onSuccess: () => void;
}

export default function RegisterForm({
    onSuccess,
}: RegisterFormProps) {

    const {
        submit,
        error,
        isLoading,
    } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (
        data: RegisterFormData
    ) => {

        const request: RegisterRequest = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password,
        };

        const success = await submit(request);

        if (success) {
            onSuccess();
        }

    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            {/* First Name */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    First Name
                </label>

                <input
                    {...register("firstName")}
                    placeholder="Enter first name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                {errors.firstName && (

                    <p className="mt-1 text-sm text-red-600">
                        {errors.firstName.message}
                    </p>

                )}

            </div>

            {/* Last Name */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Last Name
                </label>

                <input
                    {...register("lastName")}
                    placeholder="Enter last name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                {errors.lastName && (

                    <p className="mt-1 text-sm text-red-600">
                        {errors.lastName.message}
                    </p>

                )}

            </div>

            {/* Email */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                </label>

                <input
                    type="email"
                    {...register("username")}
                    placeholder="Enter email"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                {errors.username && (

                    <p className="mt-1 text-sm text-red-600">
                        {errors.username.message}
                    </p>

                )}

            </div>

            {/* Password */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                </label>

                <input
                    type="password"
                    {...register("password")}
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                {errors.password && (

                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                    </p>

                )}

            </div>

            {/* Confirm Password */}

            <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Confirm Password
                </label>

                <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm password"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                {errors.confirmPassword && (

                    <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword.message}
                    </p>

                )}

            </div>

            {/* API Error */}

            {error && (

                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>

            )}

            {/* Submit */}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading
                    ? "Creating account..."
                    : "Create Account"}
            </button>

            <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Login
                </Link>
            </p>

        </form>

    );

}