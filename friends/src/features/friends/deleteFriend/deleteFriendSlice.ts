import { Action, createSlice } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../app/rootReducer';
import { deleteFriendData } from '../../../api/friendsAPI';
import { setFriends } from '../getFriends/getFriendsSlice';

type InitialState = typeof initialState;

const initialState = {
  deleting: false,
  error: {},
  success: {},
};

const deleteFriend = createSlice({
  name: 'deleteFriend',
  initialState,
  reducers: {
    deletingFriend(state): InitialState {
      return {
        ...state,
        deleting: true,
        error: {},
        success: {},
      };
    },
    deleteFriendSuccess(state, action): InitialState {
      return {
        ...state,
        deleting: false,
        success: JSON.parse(action.payload),
        error: {},
      };
    },
    deleteFriendError(state, action): InitialState {
      return {
        ...state,
        deleting: false,
        success: {},
        error: JSON.parse(action.payload),
      };
    },
  },
});

export const {
  deletingFriend,
  deleteFriendSuccess,
  deleteFriendError,
} = deleteFriend.actions;

export default deleteFriend.reducer;

export const removeFriend = (
  id: number
): ThunkAction<void, RootState, null, Action<string>> => async (
  dispatch
): Promise<void> => {
  dispatch(deletingFriend());
  try {
    const newFriendData = await deleteFriendData(id);
    dispatch(deleteFriendSuccess(JSON.stringify(newFriendData.rest)));
    dispatch(setFriends(newFriendData.data));
  } catch (error) {
    dispatch(deleteFriendError(JSON.stringify(error)));
  }
};
