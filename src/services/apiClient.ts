import axios from "axios";
import { env } from "../config/env";
import { tokenStorage } from "../utils/token";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});