import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

interface PrivateRouteProps extends RouteProps {
  component: FC;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => {
        return authenticated ? <Component /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
