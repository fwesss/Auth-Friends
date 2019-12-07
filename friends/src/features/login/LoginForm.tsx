import React, { FC } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
} from '@chakra-ui/core';

const LoginForm: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => (
  <Modal onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Login</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl as="form">
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input id="username" type="text" autoComplete="on" />

          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" autoComplete="on" />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variantColor="blue" mr={3}>
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default LoginForm;
