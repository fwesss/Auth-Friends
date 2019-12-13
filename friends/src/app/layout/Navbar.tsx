import React, { FC, useEffect } from 'react';
import { Flex } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Logout from '../../features/auth/Logout';
import { RootState } from '../rootReducer';
import Login from '../../features/auth/Login';

const Navbar: FC = () => {
  const history = useHistory();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authenticated) {
      history.push('/FriendsList');
    }
  }, [authenticated, history]);

  return (
    <Flex w="100%" px={5} py={4} justify="flex-end">
      {authenticated ? <Logout /> : <Login />}
    </Flex>
  );
};

export default Navbar;
