import React from 'react';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
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

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired
        })
    ).isRequired,
    onTaskUpdate: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired
};

export default TaskList;