import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Button,
    Collapse,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Comment as CommentIcon } from '@mui/icons-material';
import CommentForm from './CommentForm';
import { getTaskComments, createComment, updateComment, deleteComment } from '../api/comments';

export const TaskCard = ({ task, onUpdate, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentFormOpen, setCommentFormOpen] = useState(false);
    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        if (expanded) loadComments();
    }, [expanded, task.id]);

    const loadComments = async () => {
        try {
            const res = await getTaskComments(task.id);
            setComments(res.data || []);
        } catch (e) {
            console.error('Failed to load comments', e);
        }
    };

    const handleCommentSubmit = async (data) => {
        try {
            if (editingComment) {
                await updateComment(editingComment.id, data);
            } else {
                await createComment(task.id, data);
            }
            await loadComments();
            setCommentFormOpen(false);
            setEditingComment(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            await deleteComment(id);
            await loadComments();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Checkbox checked={!!task.completed} onChange={(e) => onUpdate(task.id, { completed: e.target.checked })} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>{task.title}</Typography>
                    <IconButton onClick={() => setExpanded(!expanded)} size="small">{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
                    <IconButton onClick={() => onDelete(task.id)} size="small" color="error"><DeleteIcon /></IconButton>
                </Box>
                <Typography variant="body1" color="text.secondary">{task.description}</Typography>

                <Collapse in={expanded}>
                    <Box mt={2}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>Comments</Typography>
                            <Button startIcon={<CommentIcon />} onClick={() => setCommentFormOpen(true)} size="small">Add Comment</Button>
                        </Box>
                        <List dense>
                            {comments.map((c) => (
                                <ListItem key={c.id} divider>
                                    <ListItemText primary={c.content} secondary={new Date(c.created_at).toLocaleString()} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" size="small" onClick={() => { setEditingComment(c); setCommentFormOpen(true); }}><EditIcon fontSize="small" /></IconButton>
                                        <IconButton edge="end" size="small" onClick={() => handleDeleteComment(c.id)}><DeleteIcon fontSize="small" /></IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Collapse>
            </CardContent>

            <CommentForm open={commentFormOpen} onClose={() => { setCommentFormOpen(false); setEditingComment(null); }} onSubmit={handleCommentSubmit} initialData={editingComment} />
        </Card>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
