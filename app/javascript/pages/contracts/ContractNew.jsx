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
                user_id: "",
                creditor: "",
                amount: 0,
                dues: 1,
                grace_month: false,
                payment: 0,
                value_fee: 0,
                payday: "",
            },
            users: [],
        };

        this.onChange = this.onChange.bind(this);
        this.updateValueFee = this.updateValueFee.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }

    onChange(event) {
        this.setState(prevState => {
            let contract = Object.assign({}, prevState.contract);
            contract[event.target.name] = event.target.value;
            return { contract };
        })
    }

    updateValueFee(event) {
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
        this.props.dispatch(createContract(this.state.contract))
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
                <div>
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="2"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    onChange={this.onChange}
                    required
                  >
                  </textarea>
                </div>

                <div>
                  <label htmlFor="kind" className="form-label">Tipo de Contrato</label>
                  <select name="kind" className="form-select" value={this.state.contract.kind} onChange={this.onChange}>
                    <option value="deuda">Deuda</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="user_id" className="form-label">Usuario</label>
                  <select name="user_id" className="form-select" onChange={this.onChange}>
                    {optionsUsers}
                  </select>
                </div>

                <div>
                  <label htmlFor="creditor" className="form-label">Acreedor</label>
                  <input
                    name="creditor"
                    className="form-control"
                    placeholder="Lorem ipsum"
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
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      name="grace_month"
                      className="form-check-input"
                      value={this.state.contract.grace_month}
                      onChange={this.onChange}
                    >
                    </input>
                    <label htmlFor="grace_month" className="form-check-label">Mes de Gracia</label>
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="payday" className="form-label">Día de Pago</label>
                  <input
                    type="date"
                    name="payday"
                    className="form-control"
                    step="any"
                    placeholder="10.000,00"
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
