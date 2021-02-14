import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Contract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contract: {
                entries: []
            }
        };
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
                <td>{entry.filename}</td>
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
                <h2 className="h2">Contract {contract.id}</h2>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Kind</th>
                        <th>Creditor</th>
                        <th>Dues</th>
                        <th>Payday</th>
                      </tr>
                    </thead>
                  <tbody>
                    <tr>
                        <td>{contract.description}</td>
                        <td>{contract.kind}</td>
                        <td>{contract.creditor}</td>
                        <td>{contract.dues}</td>
                        <td>{contract.payday}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3 className="h3">Entries</h3>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Details</th>
                        <th>File</th>
                        <th>Author</th>
                      </tr>
                    </thead>
                  <tbody>
                    {entries.length > 0 ? allEntries : noEntry}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3 className="h3">New Entry</h3>
              </div>
            </>
        )
    }
}

export default Contract;
