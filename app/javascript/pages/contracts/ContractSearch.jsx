import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ContractSearch(props) {
  const [searchParams, setSearchParams] = useState({
    dni: "",
    description: "",
    kind: "",
  });

  const [contracts, setContracts] = useState([]);

  const onSearchChange = (event) => {
    setSearchParams((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const submitSearch = (event) => {
    event.preventDefault();
    axios
      .post("/api/v1/contracts/search", { search: searchParams })
      .then((response) => setContracts(response.data))
      .catch((error) => {
        console.log(error);
      });
    console.log(contracts);
  };

  const allContracts = contracts.map((contract, index) => (
    <tr key={index}>
      <td>{contract.id}</td>
      <td>{contract.description}</td>
      <td>{contract.user.full_name}</td>
      <td>{contract.kind}</td>
      <td>
        <Link to={`/contracts/${contract.id}`}>Detalles</Link>
      </td>
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
        <form className="d-flex" onSubmit={submitSearch}>
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="RUT"
              aria-label="RUT"
              name="dni"
              value={searchParams.dni}
              onChange={onSearchChange}
            />
            <input
              className="form-control"
              type="search"
              placeholder="Descripción"
              aria-label="Descripción"
              name="description"
              value={searchParams.description}
              onChange={onSearchChange}
            />
            <select
              name="kind"
              className="form-select me-2"
              value={searchParams.kind}
              onChange={onSearchChange}
            >
              <option value="">Tipo de Contrato</option>
              <option value="deuda">Deuda</option>
              <option value="legal">Legal</option>
            </select>
          </div>
          <button className="btn btn-outline-success" type="submit">
            <FontAwesomeIcon icon={["fas", "search"]} />
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
          <tbody>{contracts.length > 0 ? allContracts : noContract}</tbody>
        </table>
      </div>
    </>
  );
}

export default ContractSearch;
