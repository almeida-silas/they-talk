import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Chat from './components/Chat/';
import Login from './components/Login/';

const Routes = () => (
   <BrowserRouter>
      <Switch >
         <Route exact path="/" component={Login} />
         <Route exact path="/chat" component={Chat} />
      </Switch>
   </BrowserRouter>
);

export default Routes;
