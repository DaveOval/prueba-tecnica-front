import apiClient from "../client";

// LoginFormData interface
interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    last_name: string;
    role: string;
    token: string;
  }
}

interface LoginRequest {
    email: string;
    password: string;
}

// RegisterFormData interface
interface RegisterResponse {
  id: string;
  name: string;
  last_name: string;
  email: string;
}

interface RegisterRequest {
  name: string;
  last_name: string;
  email: string;
  password: string;
}


export const authService = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },
};

export const registerService = {
  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data);
    return response.data;
  }
}