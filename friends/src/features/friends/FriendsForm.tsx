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

type FriendsFormProps = {
  onClose: () => void;
  setRefreshFriends: Dispatch<SetStateAction<boolean>>;
};

const FriendsForm: FC<FriendsFormProps> = ({ onClose, setRefreshFriends }) => {
  const [values, setValue] = useState({
    name: '',
    age: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const addFriend = (event: FormEvent): void => {
    event.preventDefault();
    setSubmitting(true);
  };

  useEffect(() => {
    if (submitting) {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/api/friends',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        data: {
          name: values.name,
          age: values.age,
          email: values.email,
        },
      })
        .then(() => {
          setRefreshFriends(true);
          onClose();
        })
        .catch((error) => error)
        .finally(() => {
          setSubmitting(false);
        });
    }
  }, [
    onClose,
    setRefreshFriends,
    submitting,
    values.age,
    values.email,
    values.name,
  ]);

  return (
    <form onSubmit={addFriend}>
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
