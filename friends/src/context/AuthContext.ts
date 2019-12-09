import { createContext, Dispatch, SetStateAction } from 'react';

type ContextProps = {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<Partial<ContextProps>>({
  authenticated: false,
});

export default AuthContext;
