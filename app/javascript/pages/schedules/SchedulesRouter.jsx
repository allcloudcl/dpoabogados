import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import ScheduleNew from './ScheduleNew';

class SchedulesRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/schedules/new" component={ScheduleNew} />
            </Switch>
        );
    }
}

export default withRouter(SchedulesRouter);
