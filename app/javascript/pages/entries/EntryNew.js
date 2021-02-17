import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class EntryNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            details: "",
            document: null,
            author_id: JSON.parse(localStorage.getItem('user')).id,
        };

        this.onChange = this.onChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onFileChange(event) {
        this.setState({[event.target.name]: event.target.files[0]});
    }

    doCreateEntry = (event) => {
        event.preventDefault();

        // We're sending a _file_, which _needs_ be be sent in a _formData_,
        // because, how do the hell to we send a file through a JSON (actually
        // we can, something with base64, but it's more annoying than what
        // we're gonna do now)
        let data = new FormData();
        Object.entries(this.state).forEach(([key, value]) => {
            if (value != null && value != undefined) {
                data.append(`entry[${key}]`, value);
            }
        })

        axios.post('/api/v1/contracts/' + this.props.contract_id + '/entries', data)
            .then((response) =>
                // Once we've sent the new entry to the server, we recieve the
                // contract updated (with the new entry), we send the contract
                // to the parent (Contract) to update its state
                this.props.handlerUpdateContract(response.data)
            )
            .catch(error => console.log(error));
    }

    render() {
        return (
              <form onSubmit={this.doCreateEntry}>
                <label htmlFor="details" className="form-label">Detalles</label>
                <div className="input-group mb-3">
                  <textarea
                    name="details"
                    className="form-control"
                    rows="2"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    onChange={this.onChange}
                    required
                  >
                  </textarea>
                </div>

                <label htmlFor="document" className="form-label">Archivo</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    name="document"
                    className="form-control"
                    onChange={this.onFileChange}
                  >
                  </input>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Crear Entrada
                  </button>
                </div>
              </form>
        )
    }
}

export default EntryNew;
