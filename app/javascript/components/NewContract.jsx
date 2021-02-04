import React from "react";
// import Contract from "./Contract";
import { Link } from "react-router-dom";

class NewContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contract: {
                description: "",
                kind: "",
                user_id: ""
            },
            users: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/api/v1/users.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(users => this.setState({ users: users }));
    }


    onChange(event) {
        console.log(this.state);
        // event.target.name = description
        // event.target.value = asdasd
        this.setState(prevState => {
            let contract = Object.assign({}, prevState.contract);
            contract[event.target.name] = event.target.value;
            return { contract };
        })
        console.log(this.state);
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("Nig");
        const url = "/api/v1/contracts.json";
        const { contract } = this.state;
        console.log(contract);

        const body = {
            contract
        }

        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push('/contracts'))
            .catch(error => console.log(error.message));
    }

    render() {
        const { users } = this.state;
        const optionsUsers = users.map((user, index) => (
            <option value={user.id} key={index}>{user.full_name}</option>
        ));

        return (
            <>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">New Contract</h1>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea name="description" className="form-control" rows="2" onChange={this.onChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="kind" className="form-label">Kind of contract</label>
                  <select name="kind" className="form-select" onChange={this.onChange}>
                    <option value="debt">Debt</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="user_id" className="form-label">User</label>
                  <select name="user_id" className="form-select" onChange={this.onChange}>
                    {optionsUsers}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Contract
                </button>
                <Link type="button" to="/contracts" className="btn btn-secondary">
                  Back
                </Link>
              </form>
            </>
        )
    }
}

export default NewContract;
