import React from "react";
import { Switch, Route, withRouter } from "react-router";

import ScheduleNew from "./ScheduleNew";
import ScheduleEdit from "./ScheduleEdit";

function SchedulesRouter(props) {
  return (
    <Switch>
      <Route path="/schedules/new" component={ScheduleNew} />
      <Route path="/schedules/edit/:id" component={ScheduleEdit} />
    </Switch>
  );
}

export default withRouter(SchedulesRouter);
