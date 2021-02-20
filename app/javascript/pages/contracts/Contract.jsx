import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { EntryNew } from '../entries';

class Contract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contract: {
                id: "",
                description: "",
                creditor: "",
                amount: "",
                dues: "",
                grace_months: "",
                value_fee: "",
                payday: "",
                entries: [],
                user: {}
            }
        };
    }

    handlerUpdateContract = (contract) => {
        this.setState({contract: contract});
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('/api/v1/contracts/' + id)
            .then(response => this.setState({ contract: response.data }))
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    }

    render() {
        const { contract } = this.state;
        const { entries } = this.state.contract;
        const allEntries = entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.id}</td>
              <td>{entry.created_at}</td>
              <td>{entry.details}</td>
              <td>
                {entry.document != null &&
                  <a href={entry.document.link}>{entry.document.filename}</a>
                }
              </td>
              <td>{entry.author}</td>
            </tr>
        ));

        const noEntry = (
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
                <h2 className="h2">Contracto #{contract.id}</h2>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Nombre del Cliente</th>
                      <th>RUT</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{contract.user.full_name}</td>
                      <td>{contract.user.dni}</td>
                      <td>{contract.user.phone}</td>
                      <td>{contract.user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="h3">Bitácora</h3>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Detalles</th>
                      <th>Archivo</th>
                      <th>Autor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.length > 0 ? allEntries : noEntry}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3 className="h3">Nueva Entrada</h3>
              </div>
              <EntryNew contract_id={this.props.match.params.id} handlerUpdateContract={this.handlerUpdateContract}/>
            </>
        )
    }
}

export default Contract;
