import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasks';

export default function TaskManagement() {
    const [tasks, setTasks] = useState([]);
    const [taskFormOpen, setTaskFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => { fetchTasks(); }, []);

    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data || []);
        } catch (e) { console.error('Error fetching tasks', e); }
    };

    const handleCreateTask = async (data) => {
        try { await createTask(data); await fetchTasks(); setTaskFormOpen(false); } catch (e) { console.error(e); }
    };

    const handleUpdateTask = async (taskId, data) => {
        try { await updateTask(taskId, data); await fetchTasks(); setEditingTask(null); } catch (e) { console.error(e); }
    };

    const handleDeleteTask = async (taskId) => {
        try { await deleteTask(taskId); await fetchTasks(); } catch (e) { console.error(e); }
    };

    return (
        <Stack spacing={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Task Management</Typography>
                <Button variant="contained" onClick={() => setTaskFormOpen(true)}>Create Task</Button>
            </Stack>

            <TaskList tasks={tasks} onTaskUpdate={handleUpdateTask} onTaskDelete={handleDeleteTask} />

            <TaskForm open={taskFormOpen || !!editingTask} onClose={() => { setTaskFormOpen(false); setEditingTask(null); }} onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask} initialData={editingTask || undefined} />
        </Stack>
    );
}
