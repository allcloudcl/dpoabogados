import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import ContractList from './ContractList';
import Contract from './Contract';
import ContractNew from './ContractNew';

class Contracts extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/contracts" exact component={ContractList} />
                <Route path="/contracts/new" exact component={ContractNew} />
                <Route path="/contracts/:id" exact component={Contract} />
            </Switch>
        );
    }
}

export default withRouter(Contracts);
