import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import Home from "./Home";
import { Users } from "../pages/users";
import { Contracts } from "../pages/contracts";

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarOpen: false,
        };
    }

    render() {
        return (
            <>
                <Navbar />
                <Sidebar />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/contracts" component={Contracts} />
                        <Route path="/users" exact component={Users} />
                    </Switch>
                </main>
            </>
        )
    }
}

export default withRouter(Layout);
