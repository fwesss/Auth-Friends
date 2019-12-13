import React, { FC } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import FriendsForm from './FriendsForm';
import { RootState } from '../../app/rootReducer';

type FriendsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FriendsDrawer: FC<FriendsDrawerProps> = ({ isOpen, onClose }) => {
  const { editing } = useSelector((state: RootState) => state.editFriend);

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          {editing ? 'Edit Friend' : 'Add Friend'}
        </DrawerHeader>

        <FriendsForm onClose={onClose} />
      </DrawerContent>
    </Drawer>
  );
};

export default FriendsDrawer;
