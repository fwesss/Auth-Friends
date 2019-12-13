import { Action, createSlice } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import Friend from '../types';
import { RootState } from '../../../app/rootReducer';
import { putFriendData } from '../../../api/friendsAPI';
import { setFriends } from '../getFriends/getFriendsSlice';

type InitialState = typeof initialState;

const initialState = {
  putting: false,
  error: {},
  success: {},
  friendToEdit: {
    id: 0,
    name: '',
    age: '',
    email: '',
  },
  editing: false,
};

const editFriend = createSlice({
  name: 'editFriend',
  initialState,
  reducers: {
    puttingFriend(state): InitialState {
      return {
        ...state,
        putting: true,
        error: {},
        success: {},
      };
    },
    putFriendSuccess(state, action): InitialState {
      return {
        ...state,
        putting: false,
        success: JSON.parse(action.payload),
        error: {},
        editing: false,
      };
    },
    putFriendError(state, action): InitialState {
      return {
        ...state,
        putting: false,
        error: JSON.parse(action.payload),
        success: {},
        editing: false,
      };
    },
    setFriendForEditing(state, action): InitialState {
      return {
        ...state,
        friendToEdit: action.payload,
        editing: true,
      };
    },
  },
});

export const {
  puttingFriend,
  putFriendSuccess,
  putFriendError,
  setFriendForEditing,
} = editFriend.actions;

export default editFriend.reducer;

export const putFriend = (
  friend: Friend
): ThunkAction<void, RootState, null, Action<string>> => async (
  dispatch
): Promise<void> => {
  dispatch(puttingFriend());
  try {
    const newFriendData = await putFriendData(friend);
    dispatch(putFriendSuccess(JSON.stringify(newFriendData.rest)));
    dispatch(setFriends(newFriendData.data));
  } catch (error) {
    dispatch(putFriendError(JSON.stringify(error)));
  }
};
