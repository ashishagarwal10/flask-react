import { apiClient } from './client';

export const getTaskComments = async (taskId: string) => {
    return await apiClient.get(`/tasks/${taskId}/comments`);
};

export const createComment = async (taskId: string, data: { content: string }) => {
    return await apiClient.post(`/tasks/${taskId}/comments`, data);
};

export const updateComment = async (commentId: string, data: { content: string }) => {
    return await apiClient.put(`/comments/${commentId}`, data);
};

export const deleteComment = async (commentId: string) => {
    return await apiClient.delete(`/comments/${commentId}`);
};