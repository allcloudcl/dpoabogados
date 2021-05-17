import React from "react";
import { Switch, Route, withRouter } from "react-router";

import AgendaList from "./AgendaList";

function AgendaRouter(props) {
  return (
    <Switch>
      <Route path="/agenda" exact component={AgendaList} />
    </Switch>
  );
}

export default withRouter(AgendaRouter);
