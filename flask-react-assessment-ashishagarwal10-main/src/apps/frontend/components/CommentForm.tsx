import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface CommentFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { content: string }) => void;
    initialData?: { content: string };
}

export const CommentForm: React.FC<CommentFormProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [content, setContent] = useState<string>(initialData?.content || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ content });
        setContent('');
        onClose();
    };

    const handleClose = () => {
        setContent('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    {initialData ? 'Edit Comment' : 'Add Comment'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        data-testid="comment-input"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary" data-testid="submit-comment-btn">
                        {initialData ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CommentForm;