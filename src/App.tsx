import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import cityApi from 'api/cityApi';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';
import { Route, Router, Switch } from 'react-router-dom';
import { LoginRoute } from 'components/Common/LoginRoute';
import { history } from 'utils/history';

function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => console.log(res));
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <LoginRoute path="/login">
            <LoginPage />
          </LoginRoute>
          <PrivateRoute path="/admin">
            <AdminLayout />
          </PrivateRoute>
          <PrivateRoute path="/">
            <AdminLayout />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
