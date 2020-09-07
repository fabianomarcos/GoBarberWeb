import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Import from '../pages/Import';
import SigIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SigIn} />
    <Route path="/import" component={Import} />
  </Switch>
);

export default Routes;
