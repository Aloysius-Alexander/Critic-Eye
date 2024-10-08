import axios from 'axios';

// Create an Axios instance with common settings for API requests
const api = axios.create({
  baseURL: '/api/v1', // Base URL for the backend API
  withCredentials: true, // Ensures that cookies (such as JWT tokens) are sent with requests
});

// Interceptor to handle authorization headers (if needed)
// For example, you can automatically add a token to each request if stored in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Error handling interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally (optional)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error('Unauthorized! Redirecting to login...');
      window.location.href = '/signin'; // Or your login page route
    }
    return Promise.reject(error);
  }
);

export default api;
