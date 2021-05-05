import React from "react";
import { Switch, Route, withRouter } from "react-router";

import AgendaList from "./AgendaList";

class AgendaRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/agenda" exact component={AgendaList} />
      </Switch>
    );
  }
}

export default withRouter(AgendaRouter);
