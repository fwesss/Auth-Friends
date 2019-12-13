import { Action, createSlice } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { requestAuthentication } from '../../api/friendsAPI';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/rootReducer';

type InitialState = typeof initialState;

const initialState = {
  authenticating: false,
  authenticated: false,
  success: {
    data: {
      payload: '',
    },
  },
  error: {},
};

const authenticateUser = createSlice({
  name: 'authenticateUser',
  initialState,
  reducers: {
    authenticatingUser(state): InitialState {
      return {
        ...state,
        authenticating: true,
      };
    },
    authenticateUserSuccess(state, action): InitialState {
      return {
        ...state,
        authenticated: true,
        success: JSON.parse(action.payload),
        authenticating: false,
      };
    },
    authenticateUserError(state, action): InitialState {
      return {
        ...state,
        authenticating: false,
        error: JSON.parse(action.payload),
      };
    },
    unAuthenticateUser(state): InitialState {
      return {
        ...state,
        authenticated: false,
      };
    },
  },
});

export const {
  authenticatingUser,
  authenticateUserSuccess,
  authenticateUserError,
  unAuthenticateUser,
} = authenticateUser.actions;

export default authenticateUser.reducer;

export const authenticate = (
  username: string,
  password: string
): ThunkAction<void, RootState, null, Action<string>> => async (
  dispatch
): Promise<void> => {
  dispatch(authenticatingUser());
  try {
    const login = await requestAuthentication(username, password);
    localStorage.setItem('token', login.data.payload);
    dispatch(authenticateUserSuccess(JSON.stringify(login)));
  } catch (error) {
    dispatch(authenticateUserError(JSON.stringify(error)));
  }
};
