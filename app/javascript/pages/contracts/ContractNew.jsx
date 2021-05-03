import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { createContract } from '../../actions/contracts';
import { fetchUsers } from '../../actions/users';

class ContractNew extends React.Component {
    static defaultProps = {
        isFetching: false,
        message: null,
        users: []
    };

    constructor(props) {
        super(props);

        this.state = {
            contract: {
                description: "",
                kind: "deuda",
                // user_id: "",
                creditor: "",
                amount: 0,
                dues: 1,
                grace_months: 0,
                payment: 0,
                value_fee: 0,
                payday: "",
            },
            user: {
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                dni: "",
                address: "",

            },
            users: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }

    onUserChange = (event) => {
        this.setState(prevState => {
            let user = Object.assign({}, prevState.user);
            user[event.target.name] = event.target.value;
            return { user };
        })
    }

    onChange = (event) => {
        this.setState(prevState => {
            let contract = Object.assign({}, prevState.contract);
            contract[event.target.name] = event.target.value;
            return { contract };
        })
    }

    updateValueFee = (event) => {
        this.onChange(event);
        this.setState(prevState => {
            let contract = Object.assign({}, prevState.contract);
            let value_fee = (contract.amount - contract.payment)/contract.dues;
            let round_value_fee = Number.parseFloat(value_fee).toFixed(2);
            contract['value_fee'] = round_value_fee;
            return { contract };
        })
    }

    doCreateContract = (e) => {
        this.props.dispatch(createContract(this.state))
            .then(() =>
                this.setState({contract: {
                    description: '',
                    kind: '',
                    user_id: '',
                }}),
            )
            .then(response => this.props.history.push('/contracts'))
            .catch(error => console.log(error));
        e.preventDefault();
    }

    render() {
        const optionsUsers = this.props.users.map((user, index) => (
            <option value={user.id} key={index}>{user.full_name}</option>
        ));

        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2  border-bottom">
                <h1 className="h2">Nuevo Contrato</h1>
              </div>
              <form onSubmit={this.doCreateContract} className="row g-3 mt-3">

                <h4 className="mb-3">Usuario</h4>

                <div className="col-md-3">
                  <label htmlFor="first_name" className="form-label">Nombre</label>
                  <input
                    type="string"
                    name="first_name"
                    className="form-control"
                    placeholder="Juan"
                    value={this.state.user.first_name}
                    onChange={this.onUserChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-3">
                  <label htmlFor="last_name" className="form-label">Apellido</label>
                  <input
                    type="string"
                    name="last_name"
                    className="form-control"
                    placeholder="Pérez"
                    value={this.state.user.last_name}
                    onChange={this.onUserChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-3">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="+56123456789"
                    pattern="[+]{1}[0-9]{11,14}"
                    value={this.state.user.phone}
                    onChange={this.onUserChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-3">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="ejemplo@allcloud.cl"
                    value={this.state.user.email}
                    onChange={this.onUserChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-3">
                  <label htmlFor="grace_months" className="form-label">RUT</label>
                  <input
                    type="string"
                    name="dni"
                    className="form-control"
                    placeholder="12.234.567-8"
                    value={this.state.user.dni}
                    onChange={this.onUserChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-9">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input
                    type="string"
                    name="address"
                    className="form-control"
                    value={this.state.user.address}
                    onChange={this.onUserChange}
                    required
                  >
                  </input>
                </div>


                <h4 className="mb-3">Contrato</h4>

                <div>
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="2"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    value={this.state.contract.description}
                    onChange={this.onChange}
                    required
                  >
                  </textarea>
                </div>

                <div>
                  <label htmlFor="kind" className="form-label">Tipo de Contrato</label>
                  <select
                    name="kind"
                    className="form-select"
                    value={this.state.contract.kind}
                    onChange={this.onChange}
                  >
                    <option value="deuda">Deuda</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="creditor" className="form-label">Acreedor</label>
                  <input
                    name="creditor"
                    className="form-control"
                    placeholder="Lorem ipsum"
                    value={this.state.contract.creditor}
                    onChange={this.onChange}
                    required
                  >
                  </input>
                </div>

                <div className=" col-md-6">
                  <label htmlFor="amount" className="form-label">Monto</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    step="0.01"
                    placeholder="10.000,00"
                    min="0"
                    value={this.state.contract.amount}
                    onChange={this.updateValueFee}
                    required
                  >
                  </input>
                </div>

                <div className=" col-md-6">
                  <label htmlFor="payment" className="form-label">Pago Adelantado</label>
                  <input
                    type="number"
                    name="payment"
                    className="form-control"
                    step="0.01"
                    placeholder="10.000,00"
                    min="0"
                    value={this.state.contract.payment}
                    onChange={this.updateValueFee}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-6">
                  <label htmlFor="dues" className="form-label">Cuotas</label>
                  <input
                    type="number"
                    name="dues"
                    className="form-control"
                    placeholder="12"
                    min="1"
                    step="1"
                    value={this.state.contract.dues}
                    onChange={this.updateValueFee}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-6">
                  <label htmlFor="value_fee" className="form-label">Valor Cuota</label>
                  <input
                    type="number"
                    name="value_fee"
                    className="form-control"
                    step="0.01"
                    placeholder="10.000,00"
                    min="0"
                    value={this.state.contract.value_fee}
                    onChange={this.onChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-3">
                  <label htmlFor="grace_months" className="form-label">Meses de Gracia</label>
                  <input
                    type="number"
                    name="grace_months"
                    className="form-control"
                    step="1"
                    min="0"
                    max="4"
                    value={this.state.contract.grace_months}
                    onChange={this.onChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-md-3">
                  <label htmlFor="payday" className="form-label">Día de Pago</label>
                  <input
                    type="date"
                    name="payday"
                    className="form-control"
                    step="any"
                    onChange={this.onChange}
                    required
                  >
                  </input>
                </div>

                <div className="col-12 mb-3">
                  <button type="submit" className="btn btn-primary me-2">
                    Crear Contrato
                  </button>

                  <Link type="button" to="/contracts" className="btn btn-secondary">
                    Volver
                  </Link>
                </div>
              </form>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.contracts.isFetching,
        message: state.contracts.isFetching,
        users: state.users.users,
    };
}

export default connect(mapStateToProps)(ContractNew);
