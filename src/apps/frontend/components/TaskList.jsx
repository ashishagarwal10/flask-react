import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import TaskCard from './TaskCard';

export const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => (
    <Stack spacing={2}>
        {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={onTaskUpdate} onDelete={onTaskDelete} />
        ))}
    </Stack>
);

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onTaskUpdate: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
};

export default TaskList;
