import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
  Button,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { postFriend } from './addFriend/addFriendSlice';
import { RootState } from '../../app/rootReducer';
import { putFriend } from './editFriend/editFriendSlice';

type FriendsFormProps = {
  onClose: () => void;
};

const FriendsForm: FC<FriendsFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { posting } = useSelector((state: RootState) => state.addFriend);
  const { editing, putting, friendToEdit } = useSelector(
    (state: RootState) => state.editFriend
  );
  const [friend, setFriend] = useState({
    id: 0,
    name: '',
    age: '',
    email: '',
  });

  useEffect(() => {
    if (editing) {
      setFriend(friendToEdit);
    }
  }, [editing, friendToEdit]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFriend({
      ...friend,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const { id, ...rest } = friend;
    if (editing) {
      dispatch(putFriend(friend));
    } else {
      dispatch(postFriend(rest));
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DrawerBody>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Username</FormLabel>
          <Input
            id="name"
            type="text"
            name="name"
            value={friend.name}
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
            value={friend.age}
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
            value={friend.email}
            onChange={handleChange}
            autoComplete="on"
          />
        </FormControl>
      </DrawerBody>

      <DrawerFooter>
        <Button
          isLoading={posting || putting}
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
