import React, { FC } from 'react';
import { Button } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setFriendForEditing } from './editFriendSlice';
import ensure from '../../../utils/ensure';
import { RootState } from '../../../app/rootReducer';
import Friend from '../types';

type EditFriendProps = {
  friend: Friend;
  onOpen: () => void;
};

const EditFriend: FC<EditFriendProps> = ({ friend, onOpen }) => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state: RootState) => state.getFriends);

  const editFriend = (id: number | undefined): void => {
    dispatch(
      setFriendForEditing(
        ensure(friends.find((friendToEdit) => friendToEdit.id === id))
      )
    );
    onOpen();
  };

  return (
    <Button
      aria-label={`edit-${friend.email}`}
      onClick={(): void => editFriend(friend.id)}
    >
      Edit
    </Button>
  );
};

export default EditFriend;
