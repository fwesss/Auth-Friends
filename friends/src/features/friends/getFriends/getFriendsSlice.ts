import { Action, createSlice } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { getFriendsData } from '../../../api/friendsAPI';
import { RootState } from '../../../app/rootReducer';

type InitialState = typeof initialState;

const initialState = {
  fetching: false,
  error: {},
  success: {},
  friends: [
    {
      id: 0,
      name: '',
      age: '',
      email: '',
    },
  ],
};

const getFriends = createSlice({
  name: 'getFriends',
  initialState,
  reducers: {
    fetchingFriends(state): InitialState {
      return {
        ...state,
        fetching: true,
        error: {},
        success: {},
      };
    },
    fetchFriendsSuccess(state, action): InitialState {
      const { rest, data } = JSON.parse(action.payload);

      return {
        ...state,
        fetching: false,
        success: rest,
        friends: data,
        error: {},
      };
    },
    fetchFriendsError(state, action): InitialState {
      return {
        ...state,
        fetching: false,
        error: JSON.parse(action.payload),
        success: {},
      };
    },
    setFriends(state, action): InitialState {
      return {
        ...state,
        friends: action.payload,
      };
    },
  },
});

export const {
  fetchingFriends,
  fetchFriendsSuccess,
  fetchFriendsError,
  setFriends,
} = getFriends.actions;

export default getFriends.reducer;

export const fetchFriends = (): ThunkAction<
  void,
  RootState,
  null,
  Action<string>
> => async (dispatch): Promise<void> => {
  dispatch(fetchingFriends());
  try {
    const friendsData = await getFriendsData();
    dispatch(fetchFriendsSuccess(JSON.stringify(friendsData)));
  } catch (error) {
    dispatch(fetchFriendsError(JSON.stringify(error)));
  }
};
