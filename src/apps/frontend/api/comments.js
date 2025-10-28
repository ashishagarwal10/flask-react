import { apiClient } from './client';

/**
 * Get comments for a specific task
 * @param {string} taskId - The ID of the task
 * @returns {Promise} Response containing array of comments
 */
export const getTaskComments = async (taskId) => {
    return await apiClient.get(`/tasks/${taskId}/comments`);
};

/**
 * Create a new comment for a task
 * @param {string} taskId - The ID of the task
 * @param {Object} data - Comment data
 * @param {string} data.content - The content of the comment
 * @returns {Promise} Response containing the created comment
 */
export const createComment = async (taskId, data) => {
    return await apiClient.post(`/tasks/${taskId}/comments`, data);
};

/**
 * Update an existing comment
 * @param {string} commentId - The ID of the comment to update
 * @param {Object} data - Updated comment data
 * @param {string} data.content - The new content of the comment
 * @returns {Promise} Response containing the updated comment
 */
export const updateComment = async (commentId, data) => {
    return await apiClient.put(`/comments/${commentId}`, data);
};

/**
 * Delete a comment
 * @param {string} commentId - The ID of the comment to delete
 * @returns {Promise} Response indicating success/failure
 */
export const deleteComment = async (commentId) => {
    return await apiClient.delete(`/comments/${commentId}`);
};