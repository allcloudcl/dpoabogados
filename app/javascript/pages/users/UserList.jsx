import React from "react";
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/users';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    static defaultProps = {
        isFetching: false,
        users: [],
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }

    render() {
        const allUsers = this.props.users.map((user, index) => (
            <tr key={index}>
                <td>{user.id}</td>
                    <td><code>{user.dni}</code></td>
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
                <td></td>
            </tr>
        );

        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Usuarios</h1>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>RUT</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Nombre de Usuario</th>
                        <th>Correo</th>
                        <th>Rol</th>
                      </tr>
                    </thead>
                  <tbody>
                    {this.props.users.length > 0 ? allUsers : noUser}
                  </tbody>
                </table>
              </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.users.isFetching,
        users: state.users.users,
    };
}


export default connect(mapStateToProps)(UserList);
