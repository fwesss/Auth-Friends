import React, { ChangeEvent, useState, FC } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/core';

const LoginForm: FC = () => {
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

  return (
    <form>
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
    </form>
  );
};
export default LoginForm;
