import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import theme from './theme';
import LoginDrawer from '../features/login/LoginDrawer';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from '../features/friends/FriendsList';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Router>
      <Switch>
        <PrivateRoute exact path="/FriendsList" component={FriendsList} />
        <Route exact path="/" component={LoginDrawer} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
