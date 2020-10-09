import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import SigIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SigIn} />
    <Route path="/register" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
  </Switch>
);

export default Routes;
