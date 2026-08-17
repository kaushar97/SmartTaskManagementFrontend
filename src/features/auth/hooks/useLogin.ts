import { useState } from "react";
import axios from "axios";

import { useAuth } from "./useAuth";
import type { LoginRequest } from "../types/auth.types";

export function useLogin() {
    const { login } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (
        data: LoginRequest
    ): Promise<boolean> => {
        setError(null);
        setIsLoading(true);

        try {
            await login(data.username, data.password);
            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (!error.response) {
                    setError(
                        "Unable to connect. Please check your internet connection."
                    );
                    return false;
                }

                if (status === 401) {
                    setError("Invalid email or password.");
                    return false;
                }

                if (status === 400) {
                    setError("Please check your input.");
                    return false;
                }

                if (status && status >= 500) {
                    setError(
                        "Something went wrong. Please try again later."
                    );
                    return false;
                }

                setError("Login failed.");
                return false;
            }

            setError("An unexpected error occurred.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        submit,
        error,
        isLoading,
    };
}