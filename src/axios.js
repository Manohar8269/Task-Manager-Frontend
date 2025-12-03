import axios from 'axios';

// ✅ Create a pre-configured Axios instance
const API = axios.create({
  baseURL: 'https://task-manager-backend-bo7r.onrender.com', // change if backend URL differs in production
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request setup error:', error);
    return Promise.reject(error);
  }
);

// ✅ Optional: Handle global response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('🚨 API Error:', error.response.status, error.response.data);

      // Auto logout if token expired or invalid
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/'; // redirect to login
      }
    } else {
      console.error('⚠️ Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
