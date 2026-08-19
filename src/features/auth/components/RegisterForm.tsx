import { useForm } from "react-hook-form";
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
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label>First Name</label>

                <input
                    {...register("firstName")}
                />

                {errors.firstName && (
                    <p>{errors.firstName.message}</p>
                )}
            </div>

            <div>
                <label>Last Name</label>

                <input
                    {...register("lastName")}
                />

                {errors.lastName && (
                    <p>{errors.lastName.message}</p>
                )}
            </div>

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

            <div>
                <label>Confirm Password</label>

                <input
                    type="password"
                    {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message}</p>
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
                    ? "Creating account..."
                    : "Register"}
            </button>

        </form>
    );
}