/**
 * Entry to app
 */
import React from 'react';
import {
  Button,
  useDisclosure,
  ThemeProvider,
  CSSReset,
} from '@chakra-ui/core';
import theme from './theme';
import LoginForm from '../features/login/LoginForm';

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Button onClick={onOpen}>Login</Button>

      <LoginForm isOpen={isOpen} onClose={onClose} />
    </ThemeProvider>
  );
};

export default App;
