import React from "react";

class Navbar extends React.Component {
    render() {
        return (
            <header className="navbar navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow">
              <SidebarToggle target="sidebarMenu" toggle="active" />
            </header>
        )
    }
}

const SidebarToggle = (props) => {
    function toggleSidebar() {
        let target = document.getElementById(props.target);
        target.classList.toggle(props.toggle);
    }

    return (
          <button onClick={toggleSidebar} className="navbar-toggler" type="button" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    )

}

export default Navbar;
