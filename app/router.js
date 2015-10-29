import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import store from './store';

import App from './components/app';
import Index from './components/index';
import Login from './components/login';
import Signup from './components/signup';
import Create from './components/create';
import NewAssistance from './components/create-assistance';
import ViewClientList from './components/view-client-list';
import ViewClient from './components/view-client';


function requireAuth(nextState, replaceState) {
  if( ! store.getSession().isAuthenticated) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

function requireNotAuth(nextState, replaceState) {
  if(store.getSession().isAuthenticated) {
    replaceState({}, '/');
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} onEnter={requireAuth} />
      <Route path="login" component={Login} onEnter={requireNotAuth} />
      <Route path="signup" component={Signup} onEnter={requireNotAuth} />
        <Route path="create" component={Create} onEnter={requireAuth} />
        <Route path="assistance" component={NewAssistance} onEnter={requireAuth} />
      <Route path="clients" component={ViewClientList} onEnter={requireAuth} />
      <Route path="clients/:id" component={ViewClient} onEnter={requireAuth} />



  </Route>
  </Router>
), document.getElementById('application'));
