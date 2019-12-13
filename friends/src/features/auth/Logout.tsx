import React, { FC } from 'react';
import { Button } from '@chakra-ui/core/dist';
import { useDispatch } from 'react-redux';
import { unAuthenticate } from './authSlice';

const Logout: FC = () => {
  const dispatch = useDispatch();

  const logout = (): void => {
    dispatch(unAuthenticate());
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
