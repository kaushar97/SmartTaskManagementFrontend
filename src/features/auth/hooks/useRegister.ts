import { useState } from "react";
import axios from "axios";

import { useAuth } from "./useAuth";
import type { RegisterRequest } from "../types/auth.types";

export function useRegister() {
    const { register } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (
        request: RegisterRequest
    ): Promise<boolean> => {
        setError(null);
        setIsLoading(true);

        try {
            await register(request);
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

                if (status === 400) {
                    setError("Please check your input.");
                    return false;
                }

                if (status === 409) {
                    setError(
                        "An account with this email already exists."
                    );
                    return false;
                }

                if (status && status >= 500) {
                    setError(
                        "Something went wrong. Please try again later."
                    );
                    return false;
                }

                setError("Registration failed.");
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