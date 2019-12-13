import React, { FC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from './theme';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from '../features/friends/FriendsList';
import Navbar from './layout/Navbar';

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/FriendsList" component={FriendsList} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
