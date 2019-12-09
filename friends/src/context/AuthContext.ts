import { createContext, Dispatch, SetStateAction } from 'react';

type ContextProps = {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<ContextProps>({
  authenticated: false,
  setAuthenticated: (value = false) => value,
});

export default AuthContext;
