import apiClient from "../client";
import { store } from "@/store";


interface LoginResponse {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (config.url?.includes('/auth/')) {
      return config;
    }

    const state = store.getState();
    const token = state.auth?.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
    login: async (data: LoginRequest) => {
      const response = await apiClient.post<LoginResponse>('/auth/login', data);
      return response.data;
    },
  };