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
    ListItemSecondaryAction,
    Checkbox
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Comment as CommentIcon
} from '@mui/icons-material';
import { Task } from '../types/task';
import { Comment } from '../types/comment';
import { CommentForm } from './CommentForm';
import { getTaskComments, createComment, updateComment, deleteComment } from '../api/comments';

interface TaskCardProps {
    task: Task;
    onUpdate: (id: string, data: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentFormOpen, setCommentFormOpen] = useState<boolean>(false);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);

    useEffect(() => {
        if (expanded) {
            loadComments();
        }
    }, [expanded, task.id]);

    const loadComments = async () => {
        try {
            const response = await getTaskComments(task.id);
            setComments(response.data);
        } catch (error) {
            console.error('Failed to load comments:', error);
        }
    };

    const handleCommentSubmit = async (data: { content: string }) => {
        try {
            if (editingComment) {
                await updateComment(editingComment.id, data);
            } else {
                await createComment(task.id, data);
            }
            await loadComments();
            setCommentFormOpen(false);
            setEditingComment(null);
        } catch (error) {
            console.error('Failed to submit comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            await loadComments();
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Checkbox
                        checked={task.completed}
                        onChange={(e) => onUpdate(task.id, { completed: e.target.checked })}
                        data-testid="task-checkbox"
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {task.title}
                    </Typography>
                    <IconButton
                        onClick={() => setExpanded(!expanded)}
                        data-testid="toggle-comments-btn"
                        size="small"
                    >
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton
                        onClick={() => onDelete(task.id)}
                        data-testid="delete-task-btn"
                        size="small"
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    {task.description}
                </Typography>

                <Collapse in={expanded}>
                    <Box mt={2}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                                Comments
                            </Typography>
                            <Button
                                startIcon={<CommentIcon />}
                                onClick={() => setCommentFormOpen(true)}
                                size="small"
                                data-testid="add-comment-btn"
                            >
                                Add Comment
                            </Button>
                        </Box>
                        <List dense>
                            {comments.map((comment) => (
                                <ListItem key={comment.id} divider>
                                    <ListItemText primary={comment.content} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            size="small"
                                            onClick={() => {
                                                setEditingComment(comment);
                                                setCommentFormOpen(true);
                                            }}
                                            data-testid="edit-comment-btn"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            size="small"
                                            onClick={() => handleDeleteComment(comment.id)}
                                            data-testid="delete-comment-btn"
                                        >
                                            <DeleteIcon fontSize="small" />
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
                onClose={() => {
                    setCommentFormOpen(false);
                    setEditingComment(null);
                }}
                onSubmit={handleCommentSubmit}
                initialData={editingComment ? { content: editingComment.content } : undefined}
            />
        </Card>
    );
};