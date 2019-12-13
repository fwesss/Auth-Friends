// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
// eslint-disable-next-line import/no-cycle
import authReducer from '../features/auth/authSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
  // friends: friendsReducer,
});

export default rootReducer;
