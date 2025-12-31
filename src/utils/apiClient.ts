import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create a reusable Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global request interceptor (add auth, logging, etc. here)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Global response interceptor (handle errors globally)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle error globally (logging, notifications, etc.)
    if (error.response) {
      // Server responded with a status other than 2xx
      // Optionally show user-friendly error messages here
      // Example: toast.error(error.response.data.message || 'API Error');
    } else if (error.request) {
      // No response received
      // Example: toast.error('No response from server.');
    } else {
      // Something else happened
      // Example: toast.error('Unexpected error occurred.');
    }
    return Promise.reject(error);
  },
);

export default apiClient;
