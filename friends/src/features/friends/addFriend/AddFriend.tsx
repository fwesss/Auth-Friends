import React, { FC } from 'react';
import { IconButton } from '@chakra-ui/core';

type AddFriendProps = {
  onOpen: () => void;
};

const AddFriend: FC<AddFriendProps> = ({ onOpen }) => {
  const handleAdd = (): void => {
    onOpen();
  };

  return (
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
  );
};

export default AddFriend;
