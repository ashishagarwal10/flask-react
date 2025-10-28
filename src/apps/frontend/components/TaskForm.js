import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export const TaskForm = ({ open, onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, description });
        setTitle('');
        setDescription('');
        onClose();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{initialData ? 'Edit Task' : 'New Task'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 2,
                            },
                            mb: 2
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyPress={handleKeyPress}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 2,
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {initialData ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};