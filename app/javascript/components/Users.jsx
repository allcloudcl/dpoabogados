import React from "react";
// import Contract from "./Contract";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        fetch('/api/v1/users.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(users => this.setState({ users: users }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const { users } = this.state;
        const allUsers = users.map((user, index) => (
            <tr key={index}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.phone}</td>
                <td><code>{user.username}</code></td>
                <td>{user.email}</td>
                <td>{user.role}</td>
            </tr>
        ));

        const noUser = (
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        );

        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Users</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary">New</button>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                  <tbody>
                    {users.length > 0 ? allUsers : noUser}
                  </tbody>
                </table>
              </div>
            </>
        )
    }
}

export default Users;
