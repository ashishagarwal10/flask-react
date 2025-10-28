import { apiClient } from './client';

/**
 * Get all tasks
 * @returns {Promise} Response containing array of tasks
 */
export const getTasks = async () => {
    return await apiClient.get('/tasks');
};

/**
 * Get a specific task by ID
 * @param {string} id - The ID of the task to retrieve
 * @returns {Promise} Response containing the task
 */
export const getTask = async (id) => {
    return await apiClient.get(`/tasks/${id}`);
};

/**
 * Create a new task
 * @param {Object} data - Task data
 * @param {string} data.title - The title of the task
 * @param {string} data.description - The description of the task
 * @returns {Promise} Response containing the created task
 */
export const createTask = async (data) => {
    return await apiClient.post('/tasks', data);
};

/**
 * Update an existing task
 * @param {string} id - The ID of the task to update
 * @param {Object} data - Updated task data
 * @param {string} [data.title] - The new title of the task
 * @param {string} [data.description] - The new description of the task
 * @param {boolean} [data.completed] - The new completion status
 * @returns {Promise} Response containing the updated task
 */
export const updateTask = async (id, data) => {
    return await apiClient.put(`/tasks/${id}`, data);
};

/**
 * Delete a task
 * @param {string} id - The ID of the task to delete
 * @returns {Promise} Response indicating success/failure
 */
export const deleteTask = async (id) => {
    return await apiClient.delete(`/tasks/${id}`);
};