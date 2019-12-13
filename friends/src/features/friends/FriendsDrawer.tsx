import React, { FC } from 'react';
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
} from '@chakra-ui/core';
import FriendsForm from './FriendsForm';

type FriendsDrawerProps = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const FriendsDrawer: FC<FriendsDrawerProps> = ({ onOpen, isOpen, onClose }) => {
  const handleAdd = (): void => {
    onOpen();
  };

  return (
    <>
      <IconButton
        aria-label="Add Friend"
        icon="add"
        variantColor="teal"
        onClick={handleAdd}
        pos="absolute"
        zIndex={2}
        bottom="2rem"
        right="2rem"
        size="lg"
        isRound
      />

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Add Friend</DrawerHeader>

          <FriendsForm onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FriendsDrawer;
