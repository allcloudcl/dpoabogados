import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 bg-light sidebar active nav flex-column">
              <div className="navbar-brand me-0 px-3 shadow">
                <img src="/brand.png" alt="" width="24" height="24" className="d-inline-block align-top me-2"/>
                ChileDeudas
              </div>
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
                </ul>
              </div>
            </nav>
        )
    }
}

export default Sidebar;
