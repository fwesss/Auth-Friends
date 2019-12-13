import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import './setupTests';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from '@chakra-ui/core';
import { Provider } from 'react-redux';
import store from '../app/store';
import Navbar from '../app/layout/Navbar';

describe('login errors', () => {
  it('should require username and password fields to be filled out and notify user of incorrect login', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <ThemeProvider>
          <Router history={history}>
            <Navbar />
          </Router>
        </ThemeProvider>
      </Provider>
    );

    // expand the login drawer
    fireEvent.click(getByText(/login/i));

    // check for the existence of username and password
    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);

    // check that they are required fields
    expect(username).toHaveAttribute('aria-required');
    expect(password).toHaveAttribute('aria-required');

    // fill out form with incorrect credentials
    fireEvent.change(username, { target: { value: 'Scout' } });
    fireEvent.change(password, { target: { value: 'i<3Lambd4' } });

    // submit form
    fireEvent.click(getByText(/submit/i));

    // check for existence of error messages
    getByText(/incorrect username/i);

    fireEvent.change(username, { target: { value: 'Lambda School' } });
    fireEvent.change(password, { target: { value: 'scout1' } });

    fireEvent.click(getByText(/submit/i));
    getByText(/incorrect password/i);

    fireEvent.change(username, { target: { value: 'Scout' } });
    fireEvent.change(password, { target: { value: 'scout1' } });

    fireEvent.click(getByText(/submit/i));
    getByText(/incorrect username/i);
    getByText(/incorrect password/i);
  });
});
