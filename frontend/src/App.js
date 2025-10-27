import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Button, 
    Box, 
    ThemeProvider, 
    CssBaseline, 
    Grid,
    Switch,
    FormControlLabel,
    useMediaQuery
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { api } from './api';
import { getTheme } from './theme';
import Shuffle from './components/Shuffle';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskFormOpen, setTaskFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [mode, setMode] = useState('light');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const loadTasks = async () => {
        try {
            const response = await api.getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreateTask = async (data) => {
        try {
            await api.createTask(data);
            await loadTasks();
            setTaskFormOpen(false);
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    const handleUpdateTask = async (id, data) => {
        try {
            await api.updateTask(id, data);
            await loadTasks();
            setEditingTask(null);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await api.deleteTask(id);
            await loadTasks();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    return (
        <ThemeProvider theme={getTheme(mode)}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh',
                bgcolor: 'background.default',
                py: 4,
                perspective: '1000px'
            }}>
                <Container maxWidth="lg" sx={{ position: 'relative' }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 10,
                        mt: -2
                    }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mode === 'dark'}
                                    onChange={toggleColorMode}
                                    icon={<LightMode sx={{ color: '#ffd700' }} />}
                                    checkedIcon={<DarkMode sx={{ color: '#ffffff' }} />}
                                    sx={{
                                        '& .MuiSwitch-switchBase': {
                                            '&.Mui-checked': {
                                                color: '#2196f3',
                                                '& + .MuiSwitch-track': {
                                                    backgroundColor: '#1976d2',
                                                },
                                            },
                                        },
                                        '& .MuiSwitch-thumb': {
                                            backgroundColor: mode === 'dark' ? '#1976d2' : '#ffd700',
                                        },
                                    }}
                                />
                            }
                            label={mode === 'dark' ? 'Dark' : 'Light'}
                            sx={{
                                color: 'text.primary',
                                '& .MuiTypography-root': {
                                    fontSize: '0.875rem',
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 4 
                    }}>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center', 
                            gap: 2,
                            mb: 3
                        }}>
                            <Box sx={{ 
                                transform: 'translateZ(0)',
                                mb: 4,
                                mt: 2,
                                textAlign: 'center',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-10%',
                                    right: '-10%',
                                    height: '4px',
                                    background: (theme) => theme.palette.mode === 'dark' 
                                        ? 'linear-gradient(90deg, transparent, #64b5f6, transparent)'
                                        : 'linear-gradient(90deg, transparent, #1976d2, transparent)',
                                    transform: 'translateY(-50%)',
                                    zIndex: -1,
                                    opacity: 0.8
                                }
                            }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        color: (theme) => theme.palette.mode === 'dark' ? '#FFFFFF' : '#1976d2',
                                        textShadow: (theme) => 
                                            theme.palette.mode === 'dark' 
                                                ? '2px 2px 4px rgba(33, 150, 243, 0.6), -2px -2px 4px rgba(33, 150, 243, 0.6)'
                                                : '2px 2px 0 #2196f3, -2px -2px 0 #2196f3',
                                        position: 'relative',
                                        filter: 'none',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: '-10px',
                                            left: '50%',
                                            width: '80%',
                                            height: '4px',
                                            background: (theme) => theme.palette.mode === 'dark'
                                                ? 'linear-gradient(90deg, transparent, #64b5f6, transparent)'
                                                : 'linear-gradient(90deg, transparent, #1976d2, transparent)',
                                            transform: 'translateX(-50%)',
                                            borderRadius: '2px',
                                            opacity: 0.8
                                        },
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            transition: 'transform 0.3s ease'
                                        }
                                    }}
                                >
                                    <Shuffle
                                        text="Task Management"
                                        shuffleDirection="right"
                                        duration={0.5}
                                        animationMode="evenodd"
                                        shuffleTimes={2}
                                        ease="power4.out"
                                        stagger={0.05}
                                        threshold={0.1}
                                        triggerOnce={true}
                                        triggerOnHover={true}
                                        respectReducedMotion={true}
                                    />
                                </Typography>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={mode === 'dark'}
                                        onChange={toggleColorMode}
                                        icon={<LightMode sx={{ color: '#ffd700' }} />}
                                        checkedIcon={<DarkMode sx={{ color: '#ffffff' }} />}
                                        sx={{
                                            '& .MuiSwitch-switchBase': {
                                                '&.Mui-checked': {
                                                    color: '#2196f3',
                                                    '& + .MuiSwitch-track': {
                                                        backgroundColor: '#1976d2',
                                                    },
                                                },
                                            },
                                            '& .MuiSwitch-thumb': {
                                                backgroundColor: mode === 'dark' ? '#1976d2' : '#ffd700',
                                            },
                                        }}
                                    />
                                }
                                label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                                sx={{
                                    color: 'text.primary',
                                }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setTaskFormOpen(true)}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                transform: 'translateZ(20px)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #21CBF3 30%, #2196f3 90%)',
                                    transform: 'translateZ(30px) scale(1.05)',
                                }
                            }}
                        >
                            Add Task
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {tasks.map((task) => (
                            <Grid item xs={12} sm={6} md={4} key={task.id}>
                                <TaskCard
                                    task={task}
                                    onEdit={() => setEditingTask(task)}
                                    onDelete={() => handleDeleteTask(task.id)}
                                    onUpdate={loadTasks}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <TaskForm
                        open={taskFormOpen}
                        onClose={() => setTaskFormOpen(false)}
                        onSubmit={handleCreateTask}
                    />

                    <TaskForm
                        open={!!editingTask}
                        onClose={() => setEditingTask(null)}
                        onSubmit={(data) => handleUpdateTask(editingTask?.id, data)}
                        initialData={editingTask}
                    />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;