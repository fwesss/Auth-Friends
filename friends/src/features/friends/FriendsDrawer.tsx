import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from '@chakra-ui/core';
import FriendsForm from './FriendsForm';

type FriendsDrawerProps = {
  setRefreshFriends: Dispatch<SetStateAction<boolean>>;
};

const FriendsDrawer: FC<FriendsDrawerProps> = ({ setRefreshFriends }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button leftIcon="add" variantColor="teal" onClick={onOpen}>
        Add Friend
      </Button>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Add Friend</DrawerHeader>

          <FriendsForm
            onClose={onClose}
            setRefreshFriends={setRefreshFriends}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FriendsDrawer;
