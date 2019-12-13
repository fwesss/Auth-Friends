import React, { FC } from 'react';
import { Button } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { removeFriend } from './deleteFriendSlice';
import ensure from '../../../utils/ensure';
import { RootState } from '../../../app/rootReducer';
import Friend from '../types';

type DeleteFriendProps = {
  friend: Friend;
};

const DeleteFriend: FC<DeleteFriendProps> = ({ friend }) => {
  const dispatch = useDispatch();
  const { deleting } = useSelector((state: RootState) => state.deleteFriend);
  const { friends } = useSelector((state: RootState) => state.getFriends);

  const deleteFriend = (id: number | undefined): void => {
    dispatch(
      removeFriend(
        ensure(friends.find((friendToDelete) => friendToDelete.id === id)).id
      )
    );
  };

  return (
    <Button
      isLoading={deleting}
      loadingText="Deleting"
      variantColor="red"
      aria-label={`delete-${friend.email}`}
      onClick={(): void => deleteFriend(friend.id)}
    >
      Delete
    </Button>
  );
};

export default DeleteFriend;
