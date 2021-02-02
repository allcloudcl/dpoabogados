import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../components/Home";

export default (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);
