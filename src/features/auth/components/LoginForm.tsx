import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { LoginRequest } from "../types/auth.types";
import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../validation/loginSchema";

interface LoginFormProps {
    onSuccess: () =>void;
}

export default function LoginForm({
    onSuccess,
}: LoginFormProps) {

    const {
        submit,
        error,
        isLoading,
    } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (
        data: LoginRequest
    ) => {

        const success = await submit(data);

        if (success) {
            onSuccess();
        }
    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            {/* Email */}

            <div>

                <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Email
                </label>

                <input
                    id="username"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...register("username")}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                    ${
                        errors.username
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                />

                {errors.username && (

                    <p className="mt-1 text-sm text-red-600">
                        {errors.username.message}
                    </p>

                )}

            </div>

            {/* Password */}

            <div>

                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password")}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
                    ${
                        errors.password
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    }`}
                />

                {errors.password && (

                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
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
                    ? "Signing in..."
                    : "Sign In"}
            </button>

            {/* Register */}

            <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Register
                </Link>
            </p>

        </form>

    );

}