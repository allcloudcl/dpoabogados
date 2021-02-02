import React from "react";
import LogOut from "./Users/LogOut";

class Navbar extends React.Component {
    render() {
        return (
            <header className="navbar navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">ChileDeudas</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <LogOut />
                    </li>
                </ul>
            </header>
        )
    }
}

export default Navbar;
