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

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';

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
      light: '#81c784',
      dark: '#1b5e20',
    },
    warning: {
      light: '#fff17690', // Orange
      main: '#ff9800', // Orange
    },
    info: {
      main: '#64b5f6', // Light Blue
      dark: 'blue',
      light: '#bbdefb',
    },
    error: {
      main: '#e5737390', // red
      light: '#f320200d',
      dark: '#f32020',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <CssBaseline />
          <ToastContainer />
          <App />
        </I18nextProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
