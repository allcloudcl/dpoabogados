import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchContracts } from '../../actions/contracts';

class ContractList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contracts: []
        };
    }

    static defaultProps = {
        isFetching: false,
        contracts: [],
    }

    componentDidMount() {
        this.props.dispatch(fetchContracts());
    }

    render() {
        const allContracts = this.props.contracts.map((contract, index) => (
            <tr key={index}>
              <td>{contract.id}</td>
              <td>{contract.description}</td>
              <td>{contract.user.full_name}</td>
              <td>{contract.kind}</td>
              <td><Link to={`/contracts/${contract.id}`}>Detalles</Link></td>
            </tr>
        ));
        console.log(this.props.contracts);

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
                <h1 className="h2">Contratos</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group me-2">
                    <Link to="/contracts/new" className="btn btn-sm btn-outline-secondary">Nuevo</Link>
                  </div>
                </div>
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
                    {this.props.contracts.length > 0 ? allContracts : noContract}
                  </tbody>
                </table>
              </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.contracts.isFetching,
        contracts: state.contracts.contracts,
    };
}

export default connect(mapStateToProps)(ContractList);
