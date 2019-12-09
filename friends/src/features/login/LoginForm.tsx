import React, {
  ChangeEvent,
  useState,
  FC,
  FormEvent,
  useEffect,
  useContext,
} from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  Input,
  DrawerBody,
  DrawerFooter,
  Button,
  FormErrorMessage,
} from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
  const history = useHistory();
  const { setAuthenticated } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValue] = useState({
    username: '',
    password: '',
  });

  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsernameInvalid(false);
    setPasswordInvalid(false);
    setValidated(false);

    setValue({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = (): void => {
    if (values.username !== 'Lambda School') {
      setUsernameInvalid(true);
    }

    if (values.password !== 'i<3Lambd4') {
      setPasswordInvalid(true);
    }

    setValidated(true);
  };

  const login = (event: FormEvent): void => {
    event.preventDefault();
    validate();
  };

  useEffect(() => {
    if (!usernameInvalid && !passwordInvalid && validated) {
      setSubmitting(true);
    }
  }, [passwordInvalid, usernameInvalid, validated]);

  useEffect(() => {
    if (submitting) {
      axios
        .post('http://localhost:5000/api/login', {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.payload);
          if (setAuthenticated) {
            setAuthenticated(true);
          }
          history.push('/FriendsList');
          onClose();
        })
        .catch((error) => error);
    }

    setSubmitting(false);
  }, [
    history,
    onClose,
    setAuthenticated,
    submitting,
    values.password,
    values.username,
  ]);

  return (
    <form onSubmit={login}>
      <DrawerBody>
        <FormControl isRequired isInvalid={usernameInvalid}>
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

        <FormControl isRequired isInvalid={passwordInvalid}>
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
          isLoading={submitting}
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
