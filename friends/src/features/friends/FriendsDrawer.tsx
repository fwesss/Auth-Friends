import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
} from '@chakra-ui/core';
import FriendsForm from './FriendsForm';
import Friend from './types';

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
  setFriend: Dispatch<SetStateAction<Friend>>;
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const FriendsDrawer: FC<FriendsDrawerProps> = ({
  setRefreshFriends,
  action,
  setAction,
  friend,
  setFriend,
  onOpen,
  isOpen,
  onClose,
}) => {
  const handleAdd = (): void => {
    onOpen();
    setAction('SUBMIT');
  };

  useEffect(() => {
    if (action === 'SUBMIT') {
      setFriend({
        id: 0,
        name: '',
        age: '',
        email: '',
      });
    }
  }, [action, setFriend]);

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
