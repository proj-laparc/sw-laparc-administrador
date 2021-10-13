import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import './styles/global.css';

import Routes from './routes';

import AppProvider from './context';
import GlobalStyle from './styles/global';
import theme from './styles/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
