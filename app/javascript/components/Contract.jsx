import React from "react";
// import Contract from "./Contract";
import { Link } from "react-router-dom";

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
        fetch('/api/v1/contracts/' + id + '.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(contract => this.setState({ contract: contract }))
            .catch(() => this.props.history.push("/"));
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
                <h1 className="h2">Contract {contract.id}</h1>
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
            </>
        )
    }
}

export default Contract;
