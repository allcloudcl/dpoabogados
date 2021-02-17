import React from "react";

class LogOut extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLogout = (event) => {
        event.preventDefault();
        let that = this;

        fetch('/users/sign_out', {
            method: 'DELETE',
            headers: new Headers({
                'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].content
            })
        })
        .then(res => console.log(res))
        .then(() => document.location.reload(true));
    }

    render() {
        return (
            <a className="nav-link" onClick={this.handleLogout} href="/users/sign_out">Sign Out</a>
        )
    }
}

export default LogOut;
