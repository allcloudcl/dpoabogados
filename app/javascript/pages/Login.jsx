import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/user';

class Login extends React.Component {
    static defaultProps = {
        isAuthenticated: false,
        isFetching: false,
        location: {},
        errorMessage: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            style: `
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[name="login"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

            `,
        };
    }

    static isAuthenticated(token) {
        // We check if app runs with backend mode
        if (token) return true;
        if (!token) return;
    }

    changeLogin = (event) => {
        this.setState({login: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    doLogin = (e) => {
        this.setState({
            isFetching: true,
        });

        this.props.dispatch(
            loginUser({
                login: this.state.login,
                password: this.state.password,
            }),
        );
        e.preventDefault();

    }

    render() {
        const {from} = this.props.location.state || {
            from: {pathname: '/'},
        };

        if (this.props.isAuthenticated) {
            // cant access login page while logged in
            return <Redirect to={from} />;
        }

        return (
            <div>
                <style>
                  {this.state.style}
                </style>
                <form className="form-signin" onSubmit={this.doLogin}>
                  <h2 className="h2 mb-3 fw-normal">Inicia Sesion</h2>
                  <input
                    className="form-control"
                    value={this.state.login}
                    onChange={this.changeLogin}
                    type="text"
                    required
                    name="login"
                    placeholder="Correo o Nombre de Usuario"
                  />
                  <div>
                    <input
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePassword}
                      type="password"
                      required
                      name="password"
                      placeholder="Contraseña"
                    />
                  </div>
                  <div className="actions">
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                      {this.props.isFetching ? 'Cargando...' : 'Inicia Sesión'}
                    </button>
                  </div>
                  <a href="/sign_up">Regístrate</a>
                  <br />
                </form>
              </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));
