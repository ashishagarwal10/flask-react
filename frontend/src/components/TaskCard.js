import React, { useState, useEffect } from 'react';
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
    ListItemSecondaryAction
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Comment as CommentIcon
} from '@mui/icons-material';
import CommentForm from './CommentForm';
import * as api from '../api';
    Collapse,
    Button,
    Chip,
    Divider,
    Fade,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Comment as CommentIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { CommentForm } from './CommentForm';
import { api } from '../api';

export const TaskCard = ({ task, onEdit, onDelete, onUpdate }) => {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentFormOpen, setCommentFormOpen] = useState(false);
    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        if (expanded) {
            loadComments();
        }
    }, [expanded]);

    const loadComments = async () => {
        try {
            const response = await api.getTaskComments(task.id);
            setComments(response.data);
        } catch (error) {
            console.error('Failed to load comments:', error);
        }
    };

    const handleAddComment = async (data) => {
        try {
            await api.createComment(task.id, data);
            await loadComments();
            onUpdate();
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleUpdateComment = async (data) => {
        if (!editingComment) return;
        try {
            await api.updateComment(editingComment.id, data);
            await loadComments();
            setEditingComment(null);
            onUpdate();
        } catch (error) {
            console.error('Failed to update comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await api.deleteComment(commentId);
            await loadComments();
            onUpdate();
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {task.description}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton size="small" onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Box>
                </Box>

                <Collapse in={expanded}>
                    <Box mt={2}>
                        <Button
                            startIcon={<CommentIcon />}
                            variant="outlined"
                            size="small"
                            onClick={() => setCommentFormOpen(true)}
                        >
                            Add Comment
                        </Button>

                        <List>
                            {comments.map((comment) => (
                                <ListItem key={comment.id}>
                                    <ListItemText
                                        primary={comment.content}
                                        secondary={new Date(comment.created_at).toLocaleString()}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            size="small"
                                            onClick={() => setEditingComment(comment)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            size="small"
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Collapse>
            </CardContent>

            <CommentForm
                open={commentFormOpen}
                onClose={() => setCommentFormOpen(false)}
                onSubmit={handleAddComment}
            />

            {editingComment && (
                <CommentForm
                    open={true}
                    onClose={() => setEditingComment(null)}
                    onSubmit={handleUpdateComment}
                    initialData={editingComment}
                />
            )}
        </Card>
    );
};