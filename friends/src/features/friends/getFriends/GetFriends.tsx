import React, { FC, useEffect } from 'react';
import {
  useDisclosure,
  Spinner,
  Flex,
  Text,
  ButtonGroup,
  Grid,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FriendsDrawer from '../FriendsDrawer';
import { fetchFriends } from './getFriendsSlice';
import { RootState } from '../../../app/rootReducer';
import DeleteFriend from '../deleteFriend/DeleteFriend';
import EditFriend from '../editFriend/EditFriend';
import AddFriend from '../addFriend/AddFriend';

const GetFriends: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { fetching, friends } = useSelector(
    (state: RootState) => state.getFriends
  );

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} m={10}>
      {fetching ? (
        <Spinner size="xl" />
      ) : (
        friends.map((friend) => (
          <Flex direction="column" key={friend.id}>
            <Text fontWeight="bold">{friend.name}</Text>
            <Text>{`${friend.age} years old`}</Text>
            <Text>{friend.email}</Text>
            <ButtonGroup spacing={4}>
              <EditFriend friend={friend} onOpen={onOpen} />
              <DeleteFriend friend={friend} />
            </ButtonGroup>
          </Flex>
        ))
      )}

      <AddFriend onOpen={onOpen} />
      <FriendsDrawer isOpen={isOpen} onClose={onClose} />
    </Grid>
  );
};

export default GetFriends;
