import React, { FC, useEffect } from 'react';
import { Flex, Button } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unAuthenticateUser } from '../../features/auth/authSlice';
import LoginDrawer from '../../features/auth/LoginDrawer';
import { RootState } from '../rootReducer';

const Navbar: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logout = (): void => {
    localStorage.clear();
    dispatch(unAuthenticateUser());
  };

  useEffect(() => {
    if (authenticated) {
      history.push('/FriendsList');
    }
  }, [authenticated, history]);

  return (
    <Flex w="100%" px={5} py={4} justify="flex-end">
      {authenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <LoginDrawer />
      )}
    </Flex>
  );
};

export default Navbar;
