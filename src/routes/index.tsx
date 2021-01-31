import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import ListClients from '../pages/Clients/ListClients';
import ShowClient from '../pages/Clients/ShowClient';
// import SignUp from '../pages/SignUp';
// import ForgotPassword from '../pages/ForgotPassword';
// import ResetPassword from '../pages/ResetPassword';

// import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/clients/show/:id" component={ShowClient} isPrivate />
    {/* <Route path="/clients/edit/:id" component={EditClient} isPrivate /> */}
    <Route path="/clients" component={ListClients} isPrivate />

    {/* <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />


    <Route path="/profile" component={Profile} isPrivate /> */}
  </Switch>
);

export default Routes;
