import { apiClient } from './client';

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface TaskCreateData {
    title: string;
    description: string;
}

export const getTasks = async () => {
    return await apiClient.get<Task[]>('/tasks');
};

export const getTask = async (id: string) => {
    return await apiClient.get<Task>(`/tasks/${id}`);
};

export const createTask = async (data: TaskCreateData) => {
    return await apiClient.post<Task>('/tasks', data);
};

export const updateTask = async (id: string, data: Partial<TaskCreateData> & { completed?: boolean }) => {
    return await apiClient.put<Task>(`/tasks/${id}`, data);
};

export const deleteTask = async (id: string) => {
    return await apiClient.delete(`/tasks/${id}`);
};