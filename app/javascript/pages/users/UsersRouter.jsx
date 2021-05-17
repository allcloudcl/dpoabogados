import React from "react";
import { Switch, Route, withRouter } from "react-router";

import UserList from "./UserList";

function UsersRouter(props) {
  return (
    <Switch>
      <Route path="/users" exact component={UserList} />
    </Switch>
  );
}

export default withRouter(UsersRouter);
