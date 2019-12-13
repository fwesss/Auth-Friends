import React, { FC } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/core';
import LoginForm from './LoginForm';

type LoginDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginDrawer: FC<LoginDrawerProps> = ({ isOpen, onClose }) => (
  <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>
      <LoginForm onClose={onClose} />
    </DrawerContent>
  </Drawer>
);

export default LoginDrawer;
