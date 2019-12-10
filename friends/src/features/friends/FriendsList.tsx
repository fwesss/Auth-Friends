import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Flex, Text, Button } from '@chakra-ui/core';
import FriendsDrawer from './FriendsDrawer';

const FriendsList: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [refreshFriends, setRefreshFriends] = useState(true);
  const [friends, setFriends] = useState([
    {
      id: 0,
      name: '',
      age: 0,
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
    setIdToDelete(id);
    setDeleting(true);
  };

  useEffect(() => {
    if (deleting) {
      axios({
        method: 'DELETE',
        url: `http://localhost:5000/api/friends/${idToDelete}`,
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
  }, [deleting, idToDelete]);

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
            <Button
              isLoading={deleting}
              loadingText="Deleting"
              variantColor="red"
              aria-label={`delete-${friend.email}`}
              onClick={(): void => deleteFriend(friend.id)}
            >
              Delete
            </Button>
          </Flex>
        ))
      )}

      <FriendsDrawer setRefreshFriends={setRefreshFriends} />
    </>
  );
};

export default FriendsList;
