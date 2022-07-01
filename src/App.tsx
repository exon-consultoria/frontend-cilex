import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import AppProvider from './hooks';

import { useToggleTheme } from './hooks/useToggleTheme';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/global';

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  transition: Bounce,
  draggable: false,
  role: 'Warnings',
  autoClose: 3000,
});

const App: React.FC = () => {
  const { theme } = useToggleTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <Routes />
          <GlobalStyle />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
