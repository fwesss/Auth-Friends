import React, { FC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import AuthContext from '../context/AuthContext';
import theme from './theme';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from '../features/friends/FriendsList';
import Navbar from './layout/Navbar';
import useLocalStorage from '../hooks/useLocalStorage';

const App: FC = () => {
  const [authenticated, setAuthenticated] = useLocalStorage(
    'authenticated',
    false
  );

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/FriendsList" component={FriendsList} />
          </Switch>
        </AuthContext.Provider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
