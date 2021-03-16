import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

import Home from "./Home";
import { Users } from "../pages/users";
import { Contracts } from "../pages/contracts";

import About from "../pages/About";
import Agenda from "../pages/Agenda";
import Contact from "../pages/Contact";
import Support from "../pages/Support";

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarOpen: false,
        };
    }

    render() {
        return (
            <div className="wrapper">
              <Sidebar />
              <main className="content" id="main">
                <Navbar />
                <div className="p-3">
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/contracts" component={Contracts} />
                    <Route path="/users" exact component={Users} />

                    <Route path="/about" exact component={About} />
                    <Route path="/agenda" exact component={Agenda} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/support" exact component={Support} />
                  </Switch>
                </div>
              </main>
            </div>
        )
    }
}

export default withRouter(Layout);
