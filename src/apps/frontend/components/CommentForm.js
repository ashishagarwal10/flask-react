import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export const CommentForm = ({ open, onClose, onSubmit, initialData }) => {
    const [content, setContent] = useState(initialData?.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ content });
        setContent('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{initialData ? 'Edit Comment' : 'New Comment'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {initialData ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};