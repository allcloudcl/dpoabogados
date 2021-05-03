import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import UserList from './UserList';

class UsersRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/users" exact component={UserList} />
            </Switch>
        );
    }
}

export default withRouter(UsersRouter);
