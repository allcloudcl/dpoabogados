import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ContractList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contracts: [],
            search: {
                dni: '',
                description: '',
                kind: ''
            }
        };
    }

    onSearchChange = (event) => {
        this.setState(prevState => {
            let search = Object.assign({}, prevState.search);
            search[event.target.name] = event.target.value;
            return { search };
        })
    }

    submitSearch = (event) => {
        event.preventDefault();
        axios.post('/api/v1/contracts/search', {search: this.state.search})
            .then(response => this.setState({ contracts: response.data }))
            .catch(error => {
                console.log(error);
            });
        console.log(this.state.contracts);
    }

    render() {
        const allContracts = this.state.contracts.map((contract, index) => (
            <tr key={index}>
              <td>{contract.id}</td>
              <td>{contract.description}</td>
              <td>{contract.user.full_name}</td>
              <td>{contract.kind}</td>
              <td><Link to={`/contracts/${contract.id}`}>Detalles</Link></td>
            </tr>
        ));

        const noContract = (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
        );

        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Buscar contratos</h1>
                <form className="d-flex" onSubmit={this.submitSearch}>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="RUT"
                      aria-label="RUT"
                      name="dni"
                      value={this.state.search.dni}
                      onChange={this.onSearchChange}
                    />
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Descripción"
                      aria-label="Descripción"
                      name="description"
                      value={this.state.search.description}
                      onChange={this.onSearchChange}
                    />
                    <select
                      name="kind"
                      className="form-select me-2"
                      value={this.state.search.kind}
                      onChange={this.onSearchChange}
                    >
                      <option value="">Tipo de Contrato</option>
                      <option value="deuda">Deuda</option>
                      <option value="legal">Legal</option>
                    </select>
                  </div>
                  <button className="btn btn-outline-success" type="submit">
                    <FontAwesomeIcon icon={['fas', 'search']} />
                  </button>
                </form>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Usuario</th>
                        <th>Tipo de Contrato</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                  <tbody>
                    {this.state.contracts.length > 0 ? allContracts : noContract}
                  </tbody>
                </table>
              </div>
            </>
        )
    }
}

export default ContractList;
