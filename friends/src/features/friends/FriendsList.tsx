import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Flex, Text } from '@chakra-ui/core';
import FriendsDrawer from './FriendsDrawer';

const FriendsList: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
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
        });

      setIsLoading(false);
    }
  }, [refreshFriends]);

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
          </Flex>
        ))
      )}

      <FriendsDrawer setRefreshFriends={setRefreshFriends} />
    </>
  );
};

export default FriendsList;
