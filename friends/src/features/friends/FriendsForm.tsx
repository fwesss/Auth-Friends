import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  DrawerFooter,
  Button,
} from '@chakra-ui/core';
import axios from 'axios';
import Friend from './types';

type FriendsFormProps = {
  onClose: () => void;
  action: string;
  friend: Friend;
  setFriends: Dispatch<SetStateAction<Friend[]>>;
};

const FriendsForm: FC<FriendsFormProps> = ({
  onClose,
  action,
  friend: { id, name = '', age = '', email = '' },
  setFriends,
}) => {
  const [values, setValue] = useState({
    name,
    age,
    email,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setSubmitting(true);
  };

  useEffect(() => {
    if (submitting) {
      if (action === 'EDIT') {
        axios({
          method: 'PUT',
          url: `http://localhost:5000/api/friends/${id}`,
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          data: values,
        })
          .then((response) => {
            setFriends(response.data);
            onClose();
          })
          .catch((error) => error)
          .finally(() => {
            setSubmitting(false);
          });
      } else if (action === 'SUBMIT') {
        axios({
          method: 'POST',
          url: 'http://localhost:5000/api/friends',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          data: values,
        })
          .then((response) => {
            setFriends(response.data);
            onClose();
          })
          .catch((error) => error)
          .finally(() => {
            setSubmitting(false);
          });
      }
    }
  }, [
    action,
    id,
    onClose,
    setFriends,
    submitting,
    values,
    values.age,
    values.email,
    values.name,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <DrawerBody>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Username</FormLabel>
          <Input
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            autoComplete="on"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="age">Age</FormLabel>
          <Input
            id="age"
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            autoComplete="on"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="on"
          />
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

export default FriendsForm;
