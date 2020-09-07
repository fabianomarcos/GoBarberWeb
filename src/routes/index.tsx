import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import SigIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SigIn} />
    <Route path="/register" component={SignUp} />
  </Switch>
);

export default Routes;
