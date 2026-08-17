import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { LoginRequest } from "../types/auth.types";
import { useLogin } from "../hooks/useLogin";
import { loginSchema } from "../validation/loginSchema";

interface LoginFormProps {
    onSuccess: () => void;
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
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label>Email</label>

                <input
                    type="email"
                    {...register("username")}
                />

                {errors.username && (
                    <p>{errors.username.message}</p>
                )}
            </div>

            <div>
                <label>Password</label>

                <input
                    type="password"
                    {...register("password")}
                />

                {errors.password && (
                    <p>{errors.password.message}</p>
                )}
            </div>

            {error && (
                <p>{error}</p>
            )}

            <button
                type="submit"
                disabled={isLoading}
            >
                {isLoading
                    ? "Signing in..."
                    : "Login"}
            </button>

        </form>
    );
}