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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
