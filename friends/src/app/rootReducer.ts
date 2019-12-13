// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
import auth from '../features/auth/authSlice';
import getFriends from '../features/friends/getFriends/getFriendsSlice';
import addFriend from '../features/friends/addFriend/addFriendSlice';
import editFriend from '../features/friends/editFriend/editFriendSlice';
import deleteFriend from '../features/friends/deleteFriend/deleteFriendSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth,
  getFriends,
  addFriend,
  editFriend,
  deleteFriend,
});

export default rootReducer;
