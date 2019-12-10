import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
} from '@chakra-ui/core';
import FriendsForm from './FriendsForm';

type FriendsDrawerProps = {
  setRefreshFriends: Dispatch<SetStateAction<boolean>>;
  action: string;
  setAction: Dispatch<SetStateAction<string>>;
  friend: {
    id: number;
    name: string;
    age: string;
    email: string;
  };
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const FriendsDrawer: FC<FriendsDrawerProps> = ({
  setRefreshFriends,
  action,
  setAction,
  friend,
  onOpen,
  isOpen,
  onClose,
}) => {
  const handleAdd = (): void => {
    onOpen();
    setAction('SUBMIT');
  };

  return (
    <>
      <Button leftIcon="add" variantColor="teal" onClick={handleAdd}>
        Add Friend
      </Button>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Add Friend</DrawerHeader>

          <FriendsForm
            onClose={onClose}
            setRefreshFriends={setRefreshFriends}
            action={action}
            friend={friend}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FriendsDrawer;
