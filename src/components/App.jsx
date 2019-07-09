import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

const App = () => (
  <Switch>
    <Route exact path="/" component={AuthPage} />
  </Switch>
);

export default App;