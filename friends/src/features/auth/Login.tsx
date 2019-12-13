import React, { FC } from 'react';
import { Button, useDisclosure } from '@chakra-ui/core';
import LoginDrawer from './LoginDrawer';

const Login: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Login</Button>
      <LoginDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Login;
