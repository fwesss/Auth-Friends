import { Action, createSlice } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../../app/rootReducer';
import { postFriendData } from '../../../api/friendsAPI';
import Friend from '../types';
import { setFriends } from '../getFriends/getFriendsSlice';

type InitialState = typeof initialState;

const initialState = {
  posting: false,
  error: {},
  success: {},
};

const addFriend = createSlice({
  name: 'addFriend',
  initialState,
  reducers: {
    postingFriend(state): InitialState {
      return {
        ...state,
        posting: true,
        error: {},
        success: {},
      };
    },
    postFriendSuccess(state, action): InitialState {
      return {
        ...state,
        posting: false,
        success: JSON.parse(action.payload),
        error: {},
      };
    },
    postFriendError(state, action): InitialState {
      return {
        ...state,
        posting: false,
        error: JSON.parse(action.payload),
        success: {},
      };
    },
  },
});

export const {
  postingFriend,
  postFriendSuccess,
  postFriendError,
} = addFriend.actions;

export default addFriend.reducer;

export const postFriend = (
  friend: Friend
): ThunkAction<void, RootState, null, Action<string>> => async (
  dispatch
): Promise<void> => {
  dispatch(postingFriend());
  try {
    const newFriendData = await postFriendData(friend);
    dispatch(postFriendSuccess(JSON.stringify(newFriendData.rest)));
    dispatch(setFriends(newFriendData.data));
  } catch (error) {
    dispatch(postFriendError(JSON.stringify(error)));
  }
};
