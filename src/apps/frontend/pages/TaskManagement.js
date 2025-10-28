import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasks';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [taskFormOpen, setTaskFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleCreateTask = async (data) => {
        try {
            await createTask(data);
            await fetchTasks();
            setTaskFormOpen(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (taskId, data) => {
        try {
            await updateTask(taskId, data);
            await fetchTasks();
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            await fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <Stack spacing={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1">
                    Task Management
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setTaskFormOpen(true)}
                    data-testid="create-task-btn"
                >
                    Create Task
                </Button>
            </Stack>

            <TaskList
                tasks={tasks}
                onTaskUpdate={handleUpdateTask}
                onTaskDelete={handleDeleteTask}
            />

            <TaskForm
                open={taskFormOpen || !!editingTask}
                onClose={() => {
                    setTaskFormOpen(false);
                    setEditingTask(null);
                }}
                onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
                initialData={editingTask || undefined}
            />
        </Stack>
    );
};

export default TaskManagement;