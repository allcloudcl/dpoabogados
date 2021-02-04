import React from "react";

class Navbar extends React.Component {
    render() {
        return (
            <header className="navbar navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow">
              <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">ChileDeudas</a>
              <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </header>
        )
    }
}

export default Navbar;
