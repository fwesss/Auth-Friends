import React, { FC, useContext } from 'react';
import { Flex, Button } from '@chakra-ui/core';
import LoginDrawer from '../../features/login/LoginDrawer';
import AuthContext from '../../context/AuthContext';

const Navbar: FC = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const logout = (): void => {
    localStorage.clear();
    setAuthenticated(false);
  };

  return (
    <Flex w="100%" px={5} py={4}>
      {authenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <LoginDrawer />
      )}
    </Flex>
  );
};

export default Navbar;
