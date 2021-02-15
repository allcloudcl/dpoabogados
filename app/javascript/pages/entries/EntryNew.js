import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class EntryNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entry: {
                details: "",
                document: null,
                author_id: JSON.parse(localStorage.getItem('user')).id,
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onChange(event) {
        this.setState(prevState => {
            let entry = Object.assign({}, prevState.entry);
            entry[event.target.name] = event.target.value;
            return { entry };
        })
    }

    onFileChange(event) {
        this.setState(prevState => {
            let entry = Object.assign({}, prevState.entry);
            entry[event.target.name] = event.target.files[0];
            return { entry };
        })
    }

    doCreateEntry = (e) => {
        axios.post('/api/v1/contracts/' + this.props.contract_id + '/entries', this.state.entry)
            .then((response) =>
                this.props.handlerUpdateContract(response.data)
            )
            .catch(error => console.log(error));
        e.preventDefault();
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
                    onChange={this.onChange}>
                  </textarea>
                </div>

                <label htmlFor="document" className="form-label">Archivo</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    name="document"
                    className="form-control"
                    onChange={this.onFileChange}>
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
