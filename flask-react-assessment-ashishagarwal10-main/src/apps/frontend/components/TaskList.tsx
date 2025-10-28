import React from 'react';
import { Stack } from '@mui/material';
import { TaskCard } from './TaskCard';
import { Task } from '../types/task';

interface TaskListProps {
    tasks: Task[];
    onTaskUpdate: (id: string, data: Partial<Task>) => void;
    onTaskDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate, onTaskDelete }) => {
    return (
        <Stack spacing={2}>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onTaskUpdate}
                    onDelete={onTaskDelete}
                />
            ))}
        </Stack>
    );
};