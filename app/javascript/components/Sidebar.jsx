import React from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Sidebar;
