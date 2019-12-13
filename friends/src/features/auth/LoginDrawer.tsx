import React, { FC } from 'react';
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/core';
import LoginForm from './LoginForm';

const LoginDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Login</Button>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>

          <LoginForm onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LoginDrawer;
