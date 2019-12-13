import React, {
  ChangeEvent,
  useState,
  FC,
  FormEvent,
  useEffect,
  useReducer,
} from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  DrawerBody,
  DrawerFooter,
  Button,
  FormErrorMessage,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { authenticate } from './authSlice';

type LoginFormProps = {
  onClose: () => void;
};

const initialValidState = {
  username: false,
  password: false,
  validated: false,
};

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { authenticating } = useSelector((state: RootState) => state.auth);

  const [values, setValue] = useState({
    username: '',
    password: '',
  });

  const [valid, setValid] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialValidState
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValid(initialValidState);

    setValue({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = (): boolean => {
    if (values.username !== 'Lambda School') {
      setValid({ username: true });
    }

    if (values.password !== 'i<3Lambd4') {
      setValid({ password: true });
    }

    return true;
  };

  const login = (event: FormEvent): void => {
    event.preventDefault();
    setValid({ validated: validate() });
  };

  useEffect(() => {
    if (!valid.username && !valid.password && valid.validated) {
      dispatch(authenticate(values.username, values.password));
    }
  }, [
    dispatch,
    valid.password,
    valid.username,
    valid.validated,
    values.password,
    values.username,
  ]);

  return (
    <form onSubmit={login}>
      <DrawerBody>
        <FormControl isRequired isInvalid={valid.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            autoComplete="on"
          />
          <FormErrorMessage>Incorrect username</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={valid.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="on"
          />
          <FormErrorMessage>Incorrect password</FormErrorMessage>
        </FormControl>
      </DrawerBody>

      <DrawerFooter>
        <Button
          isLoading={authenticating}
          loadingText="Submitting"
          type="submit"
          variantColor="blue"
          mr={3}
        >
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DrawerFooter>
    </form>
  );
};
export default LoginForm;
