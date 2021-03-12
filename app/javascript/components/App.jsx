import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { far, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { fas, faCog, faFile, faHome, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from '../actions/user';

import Layout from './Layout';
import Login from '../pages/Login';

library.add(
    fas,
    far,
    faCog,
    faFile,
    faHome,
    faSearch,
    faSignOutAlt,
    faUser,
    faQuestionCircle
);

const PrivateRoute = ({dispatch, component, ...rest}) => {
    // if there's no user logged in
    if (!Login.isAuthenticated(localStorage.getItem('auth_token'))) {
        dispatch(logoutUser());
        return (<Redirect to="/login" />)
    // else, take me to my desired route
    } else {
        return (
            <Route {...rest} render={props => (React.createElement(component, props))} />
        );
    }
};

class App extends React.Component {
    render() {
        return (
            <Router>
              <Switch>
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/" dispatch={this.props.dispatch} component={Layout} />
              </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
