import React from "react";
import { Switch, Route, withRouter } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import Home from "./Home";

import { ContractsRouter } from "../pages/contracts";
import { SchedulesRouter } from "../pages/schedules";
import { UsersRouter } from "../pages/users";
import { AgendaRouter } from "../pages/agenda";

import About from "../pages/About";
import Support from "../pages/Support";

function Layout(props) {
  return (
    <div className="wrapper">
      <Sidebar />
      <main className="content" id="main">
        <Navbar />
        <div className="p-3">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/agenda" exact component={AgendaRouter} />
            <Route path="/contracts" component={ContractsRouter} />
            <Route path="/schedules" component={SchedulesRouter} />
            <Route path="/users" component={UsersRouter} />

            <Route path="/about" exact component={About} />
            <Route path="/support" exact component={Support} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default withRouter(Layout);
