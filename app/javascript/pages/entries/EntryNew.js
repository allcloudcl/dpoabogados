import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

function EntryNew(props) {
  const [entry, setEntry] = useState({
    details: "",
    document: null,
    author_id: JSON.parse(localStorage.getItem("user")).id,
  });

  const onChange = (event) => {
    let val =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    setEntry((prevState) => {
      return { ...prevState, [event.target.name]: val };
    });
  };

  const doCreateEntry = (event) => {
    event.preventDefault();

    // We're sending a _file_, which _needs_ be be sent in a _formData_,
    // because, how do the hell to we send a file through a JSON (actually
    // we can, something with base64, but it's more annoying than what
    // we're gonna do now)
    let data = new FormData();
    Object.entries(entry).forEach(([key, value]) => {
      if (value != null && value != undefined) {
        data.append(`entry[${key}]`, value);
      }
    });

    axios
      .post("/api/v1/contracts/" + props.contract_id + "/entries", data)
      .then((response) =>
        // Once we've sent the new entry to the server, we recieve the
        // contract updated (with the new entry), we send the contract
        // to the parent (Contract) to update its state
        props.handlerUpdateContract(response.data)
      )
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={doCreateEntry}>
      <label htmlFor="details" className="form-label">
        Detalles
      </label>
      <div className="input-group mb-3">
        <textarea
          name="details"
          className="form-control"
          rows="2"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          onChange={onChange}
          required
        ></textarea>
      </div>

      <label htmlFor="document" className="form-label">
        Archivo
      </label>
      <div className="input-group mb-3">
        <input
          type="file"
          name="document"
          className="form-control"
          onChange={onChange}
        ></input>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Crear Entrada
        </button>
      </div>
    </form>
  );
}

export default EntryNew;
