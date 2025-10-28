import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export const TaskForm = ({ open, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });

    useEffect(() => {
        setFormData({ title: initialData?.title || '', description: initialData?.description || '' });
    }, [initialData, open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        onSubmit({ title: formData.title.trim(), description: formData.description.trim() });
        setFormData({ title: '', description: '' });
        onClose();
    };

    const handleClose = () => {
        setFormData({ title: '', description: '' });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{initialData ? 'Edit Task' : 'Create Task'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {initialData ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

TaskForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
};

export default TaskForm;
