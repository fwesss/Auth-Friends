import React, { ChangeEvent, useState, FC, FormEvent } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const history = useHistory();
  const [values, setValue] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event: FormEvent): void => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.payload);
        history.push('/FriendsList');
      })
      .catch((error) => error);
  };

  return (
    <form onSubmit={login}>
      <DrawerBody>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            autoComplete="on"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="on"
          />
        </FormControl>
      </DrawerBody>

      <DrawerFooter>
        <Button type="submit" variantColor="blue" mr={3}>
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DrawerFooter>
    </form>
  );
};
export default LoginForm;
