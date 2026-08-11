import { apiClient } from "../../../services/apiClient";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth.types";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    request
  );

  return response.data;
};

export const register = async (
  request: RegisterRequest
): Promise<boolean> => {
  const response = await apiClient.post<boolean>(
    "/auth/register",
    request
  );

  return response.data;
};