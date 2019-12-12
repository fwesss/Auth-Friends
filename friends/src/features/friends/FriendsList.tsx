import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import {
  useDisclosure,
  Spinner,
  Flex,
  Text,
  Button,
  ButtonGroup,
  Grid,
} from '@chakra-ui/core';
import FriendsDrawer from './FriendsDrawer';
import ensure from '../../utils/ensure';

const FriendsList: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(0);
  const [friendToEdit, setFriendToEdit] = useState({
    id: 0,
    name: '',
    age: '',
    email: '',
  });
  const [action, setAction] = useState('');
  const [friends, setFriends] = useState([
    {
      id: 0,
      name: '',
      age: '',
      email: '',
    },
  ]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/api/friends',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        return error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deleteFriend = (id: number): void => {
    setFriendToDelete(id);
    setDeleting(true);
  };

  const editFriend = (id: number): void => {
    setAction('EDIT');
    setFriendToEdit(ensure(friends.find((friend) => friend.id === id)));
    onOpen();
  };

  useEffect(() => {
    if (deleting) {
      axios({
        method: 'DELETE',
        url: `http://localhost:5000/api/friends/${friendToDelete}`,
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then((response) => setFriends(response.data))
        .catch((error) => error)
        .finally(() => {
          setDeleting(false);
        });
    }
  }, [deleting, friendToDelete]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} m={10}>
      {isLoading ? (
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

      <FriendsDrawer
        setFriends={setFriends}
        action={action}
        setAction={setAction}
        friend={friendToEdit}
        setFriend={setFriendToEdit}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Grid>
  );
};

export default FriendsList;
