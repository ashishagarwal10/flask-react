import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 30, 0.9)',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    },
    action: {
      hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
          background: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(30, 30, 30, 0.9)',
          boxShadow: mode === 'light'
            ? '0 8px 32px rgba(0, 0, 0, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.5)',
          border: '1px solid',
          borderColor: mode === 'light'
            ? 'rgba(255, 255, 255, 0.3)'
            : 'rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          transform: 'perspective(1000px) rotateX(0) rotateY(0)',
          '&:hover': {
            transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)',
            boxShadow: mode === 'light'
              ? '0 12px 48px rgba(0, 0, 0, 0.15)'
              : '0 12px 48px rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));