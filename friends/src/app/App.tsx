/**
 * Entry to app
 */
import React from 'react';
import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  ThemeProvider,
  CSSReset,
} from '@chakra-ui/core';
import theme from './theme';

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Button onClick={onOpen}>Login</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" type="text" />

              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" />
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
    </ThemeProvider>
  );
};

export default App;
