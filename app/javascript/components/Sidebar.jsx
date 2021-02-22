import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logoutUser } from '../actions/user';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    doLogout = () => {
        this.props.dispatch(logoutUser());
        return (
            <Redirect to="/" />
        )
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
                          <FontAwesomeIcon icon={['fas', 'home']} /> Principal
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/contracts" className="nav-link">
                          <FontAwesomeIcon icon={['far', 'file']} /> Contratos
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/users" className="nav-link">
                          <FontAwesomeIcon icon={['fas', 'user']} /> Usuarios
                        </NavLink>
                      </li>
                      <hr />
                      <button className="nav-link" onClick={this.doLogout}>Salir</button>
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
