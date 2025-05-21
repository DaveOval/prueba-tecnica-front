import axios from 'axios';
import { store } from '@/store';
import { logout } from '@/store/slices/authSlice';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token  = state.auth?.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
        // Dispatch logout action
      store.dispatch(logout());
        // Redirect to login page
      window.location.href = '/auth/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient; 