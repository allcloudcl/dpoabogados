import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { logoutUser } from '../actions/user';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    doLogout = () => {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div className="container-fluid">
              <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                  <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <NavLink to="/" exact className="nav-link">
                          <span data-feather="home"></span>
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/contracts" className="nav-link">
                          <span data-feather="file"></span>
                          Contracts
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/users" className="nav-link">
                          <span data-feather="users"></span>
                          Users
                        </NavLink>
                      </li>
                      <hr />
                      <button className="nav-link" onClick={this.doLogout}>Sign out</button>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        init: state.runtime.initialNow,
    };
}

export default connect(mapStateToProps)(Sidebar);
