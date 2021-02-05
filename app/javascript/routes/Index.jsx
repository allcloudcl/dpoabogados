import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import Home from "../components/Home";
import Contracts from "../components/Contracts";
import NewContract from "../components/NewContract";
import Users from "../components/Users";
import Contract from "../components/Contract";

export default (
  <Router>
    <Navbar />
    <Sidebar />
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contracts" exact component={Contracts} />
        <Route path="/contracts/new" exact component={NewContract} />
        <Route path="/contracts/:id" component={Contract} />
        <Route path="/users" exact component={Users} />
      </Switch>
    </main>
  </Router>
);
