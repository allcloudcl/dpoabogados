import React from "react";
import { Switch, Route, withRouter } from "react-router";

import ScheduleNew from "./ScheduleNew";

function SchedulesRouter(props) {
  return (
    <Switch>
      <Route path="/schedules/new" component={ScheduleNew} />
    </Switch>
  );
}

export default withRouter(SchedulesRouter);
