import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export const CommentForm = ({ open, onClose, onSubmit, initialData }) => {
    const [content, setContent] = useState(initialData?.content || '');

    useEffect(() => {
        setContent(initialData?.content || '');
    }, [initialData, open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim() === '') return;
        onSubmit({ content: content.trim() });
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
                <DialogTitle>{initialData ? 'Edit Comment' : 'Add Comment'}</DialogTitle>
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
                    <Button type="submit" variant="contained" color="primary">
                        {initialData ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

CommentForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
};

export default CommentForm;
