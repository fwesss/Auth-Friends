/**
 * Entry to app
 */
import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from './theme';
import LoginDrawer from '../features/login/LoginDrawer';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <LoginDrawer />
  </ThemeProvider>
);

export default App;
