import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { logoutUser } from "../actions/auth";

function Navbar(props) {
  const doLogout = () => {
    props.dispatch(logoutUser());
    return <Redirect to="/" />;
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark sticky-top p-0 shadow">
      <div className="container-fluid">
        <SidebarToggle target="sidebarMenu" toggle="active" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbarMenu">
          <ul className="navbar-nav px-3 ms-auto">
            <li className="nav-item dropdown">
              <a
                id="dropdown01"
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={["fas", "cog"]} />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdown01"
              >
                <li>
                  <Link className="dropdown-item" to="/support">
                    <FontAwesomeIcon icon={["far", "question-circle"]} />{" "}
                    Soporte
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="/" onClick={doLogout}>
                    <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
                    Salir
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const SidebarToggle = (props) => {
  function toggleSidebar() {
    let target = document.getElementById(props.target);
    target.classList.toggle(props.toggle);
    let main = document.getElementById("main");
    main.classList.toggle("active");
  }

  return (
    <button
      onClick={toggleSidebar}
      className="btn btn-dark"
      type="button"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle sidebar"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};

function mapStateToProps(state) {
  return {
    init: state.runtime.initialNow,
  };
}

export default connect(mapStateToProps)(Navbar);
