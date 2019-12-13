import React, { FC, useEffect } from 'react';
import {
  useDisclosure,
  Spinner,
  Flex,
  Text,
  Button,
  ButtonGroup,
  Grid,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FriendsDrawer from './FriendsDrawer';
import ensure from '../../utils/ensure';
import { fetchFriends } from './getFriends/getFriendsSlice';
import { RootState } from '../../app/rootReducer';
import { setFriendForEditing } from './editFriend/editFriendSlice';
import { removeFriend } from './deleteFriend/deleteFriendSlice';

const FriendsList: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { fetching, friends } = useSelector(
    (state: RootState) => state.getFriends
  );
  const { deleting } = useSelector((state: RootState) => state.deleteFriend);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const editFriend = (id: number): void => {
    dispatch(
      setFriendForEditing(ensure(friends.find((friend) => friend.id === id)))
    );
    onOpen();
  };

  const deleteFriend = (id: number): void => {
    dispatch(
      removeFriend(ensure(friends.find((friend) => friend.id === id)).id)
    );
  };

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
              <Button
                aria-label={`edit-${friend.email}`}
                onClick={(): void => editFriend(friend.id)}
              >
                Edit
              </Button>

              <Button
                isLoading={deleting}
                loadingText="Deleting"
                variantColor="red"
                aria-label={`delete-${friend.email}`}
                onClick={(): void => deleteFriend(friend.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Flex>
        ))
      )}

      <FriendsDrawer onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </Grid>
  );
};

export default FriendsList;
