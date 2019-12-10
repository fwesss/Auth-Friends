import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import {
  useDisclosure,
  Spinner,
  Flex,
  Text,
  Button,
  ButtonGroup,
} from '@chakra-ui/core';
import FriendsDrawer from './FriendsDrawer';

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
  const [refreshFriends, setRefreshFriends] = useState(true);
  const [friends, setFriends] = useState([
    {
      id: 0,
      name: '',
      age: '',
      email: '',
    },
  ]);

  useEffect(() => {
    if (refreshFriends) {
      setIsLoading(true);
    }
  }, [refreshFriends]);

  useEffect(() => {
    if (refreshFriends) {
      setRefreshFriends(false);
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
    }
  }, [refreshFriends]);

  const deleteFriend = (id: number): void => {
    setFriendToDelete(id);
    setDeleting(true);
  };

  const editFriend = (id: number): void => {
    setAction('EDIT');
    setFriendToEdit(friends.filter((friend) => friend.id === id)[0]);
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
        .then((response) => response)
        .catch((error) => error)
        .finally(() => {
          setDeleting(false);
          setRefreshFriends(true);
        });
    }
  }, [deleting, friendToDelete]);

  return (
    <>
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
        setRefreshFriends={setRefreshFriends}
        action={action}
        setAction={setAction}
        friend={friendToEdit}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default FriendsList;
