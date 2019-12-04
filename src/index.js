import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";

import { Provider } from "react-redux";
import store from "./data/store";
import App from "./App";
import Error from "./components/Error";
import PrivateRoute from "./components/private-route/PrivateRoute";

import jwtdecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './data/actions/types';

import { logoutUser } from './data/actions';

if(localStorage.jwtToken){
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwtdecode(token)
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded})

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());

    window.location.href("/login");
  }
}




ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <PrivateRoute path="/dashboard" exact component={App}/>
          <Route component={Error}/>
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
