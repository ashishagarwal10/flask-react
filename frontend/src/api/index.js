import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const api = {
    // Task endpoints
    getTasks: () => 
        axios.get(`${API_BASE_URL}/tasks`),
    
    createTask: (data) =>
        axios.post(`${API_BASE_URL}/tasks`, data),
    
    updateTask: (id, data) =>
        axios.put(`${API_BASE_URL}/tasks/${id}`, data),
    
    deleteTask: (id) =>
        axios.delete(`${API_BASE_URL}/tasks/${id}`),
    
    // Comment endpoints
    getTaskComments: (taskId) =>
        axios.get(`${API_BASE_URL}/tasks/${taskId}/comments`),
    
    createComment: (taskId, data) =>
        axios.post(`${API_BASE_URL}/tasks/${taskId}/comments`, data),
    
    updateComment: (id, data) =>
        axios.put(`${API_BASE_URL}/comments/${id}`, data),
    
    deleteComment: (id) =>
        axios.delete(`${API_BASE_URL}/comments/${id}`)
};