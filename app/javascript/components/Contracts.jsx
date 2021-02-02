import React from "react";
// import Contract from "./Contract";

class Contracts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contracts: []
        };
    }

    componentDidMount() {
        fetch('/api/v1/contracts.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(contracts => this.setState({ contracts: contracts }))
            .catch(() => this.props.history.push("/"));
    }

    render() {
        const { contracts } = this.state;
        const allContracts = contracts.map((contract, index) => (
            <tr key={index}>
                <td>{contract.id}</td>
                <td>{contract.description}</td>
                <td>{contract.user.name}</td>
                <td>{contract.kind}</td>
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
                <h1 className="h2">Contracts</h1>
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
                        <th>Description</th>
                        <th>User</th>
                        <th>Kind</th>
                      </tr>
                    </thead>
                  <tbody>
                    {contracts.length > 0 ? allContracts : noContract}
                  </tbody>
                </table>
              </div>
            </>
        )
    }
}

export default Contracts;
