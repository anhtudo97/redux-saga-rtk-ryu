import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = {};

export const LoginRoute = (props: RouteProps) => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (isLoggedIn) return <Redirect to="/admin" />;
  return <Route {...props} />;
};
