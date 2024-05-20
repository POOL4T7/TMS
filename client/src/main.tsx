import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#3b3b5e', // dark blue
      light: '#F9FAFB', // light grey
      dark: '#121212', // black
    },
    secondary: {
      main: '#9c27b0', // default purple
      light: '#edeff2', // light grey
      dark: '#d9dce0', // light grey
    },
    success: {
      main: '#275929', // Green
    },
    warning: {
      main: '#ff9800', // Orange
    },
    info: {
      main: '#2196f3', // Light Blue
    },
    error: {
      main: '#f32020', // red
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <CssBaseline />
        <ToastContainer />
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
