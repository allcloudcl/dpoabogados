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
                kind: "",
                user_id: "",
                creditor: "",
                amount: "",
                dues: "",
                grace_month: false,
                payment: "",
                value_fee: "",
                payday: "",
            },
            users: [],
        };

        this.onChange = this.onChange.bind(this);
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

    doCreateContract = (e) => {
        this.props.dispatch( createContract(this.state.contract))
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
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Nuevo Contrato</h1>
              </div>
              <form onSubmit={this.doCreateContract}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                      <textarea
                          name="description"
                          className="form-control"
                          rows="2"
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                          onChange={this.onChange}>
                      </textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="kind" className="form-label">Tipo de Contrato</label>
                  <select name="kind" className="form-select" onChange={this.onChange}>
                    <option value="debt">Deuda</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="user_id" className="form-label">Usuario</label>
                  <select name="user_id" className="form-select" onChange={this.onChange}>
                    {optionsUsers}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="creditor" className="form-label">Acreedor</label>
                      <input
                          name="creditor"
                          className="form-control"
                          placeholder="Lorem ipsum"
                          onChange={this.onChange}>
                      </input>
                </div>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Monto</label>
                      <input
                          type="number"
                          name="amount"
                          className="form-control"
                          step="any"
                          placeholder="10.000,00"
                          onChange={this.onChange}>
                      </input>
                </div>

                <div className="mb-3">
                  <label htmlFor="dues" className="form-label">Cuotas</label>
                      <input
                          type="number"
                          name="dues"
                          className="form-control"
                          placeholder="12"
                          onChange={this.onChange}>
                      </input>
                </div>

                <div className="mb-3">
                  <label htmlFor="grace_month" className="form-label">Mes de Gracia</label>
                      <input
                          type="checkbox"
                          name="grace_month"
                          className="checkbox"
                          onChange={this.onChange}>
                      </input>
                </div>

                <div className="mb-3">
                  <label htmlFor="payment" className="form-label">Pago</label>
                      <input
                          type="number"
                          name="payment"
                          className="form-control"
                          step="any"
                          placeholder="10.000,00"
                          onChange={this.onChange}>
                      </input>
                </div>

                <div className="mb-3">
                  <label htmlFor="value_fee" className="form-label">Valor Cuota</label>
                      <input
                          type="number"
                          name="value_fee"
                          className="form-control"
                          step="any"
                          placeholder="10.000,00"
                          onChange={this.onChange}>
                      </input>
                </div>

                <div className="mb-3">
                  <label htmlFor="payday" className="form-label">Día de Pago</label>
                      <input
                          type="date"
                          name="payday"
                          className="form-control"
                          step="any"
                          placeholder="10.000,00"
                          onChange={this.onChange}>
                      </input>
                </div>

                <button type="submit" className="btn btn-primary">
                  Crear Contrato
                </button>

                <Link type="button" to="/contracts" className="btn btn-secondary">
                  Volver
                </Link>
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
