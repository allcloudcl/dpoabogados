import React, { useEffect, useState } from "react";
import axios from "axios";

import { EntryNew } from "../entries";

function Contract(props) {
  const [contract, setContract] = useState({
    id: "",
    description: "",
    creditor: "",
    amount: "",
    dues: "",
    grace_months: "",
    value_fee: "",
    payday: "",
    entries: [],
    user: {},
  });

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get("/api/v1/contracts/" + id)
      .then((response) => setContract(response.data))
      .catch((error) => {
        console.log(error);
        props.history.push("/");
      });
  }, []);

  const handlerUpdateContract = (contract) => {
    setContract(contract);
  };

  const allEntries = contract.entries.map((entry, index) => (
    <tr key={index}>
      <td>{entry.id}</td>
      <td>{entry.created_at}</td>
      <td>{entry.details}</td>
      <td>
        {entry.document != null && (
          <a href={entry.document.link}>{entry.document.filename}</a>
        )}
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
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <tbody>
                <tr>
                  <th>Descripción</th>
                  <td>{contract.description}</td>
                </tr>
                <tr>
                  <th>Acreedor</th>
                  <td>{contract.creditor}</td>
                </tr>
                <tr>
                  <th>Monto</th>
                  <td>{contract.amount}</td>
                </tr>
                <tr>
                  <th>Cuotas</th>
                  <td>{contract.dues}</td>
                </tr>
                <tr>
                  <th>Valor Cuota</th>
                  <td>{contract.value_fee}</td>
                </tr>
                <tr>
                  <th>Meses de Gracia</th>
                  <td>{contract.grace_months}</td>
                </tr>
                <tr>
                  <th>Día de Pago</th>
                  <td>{contract.payday}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col">
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <tbody>
                <tr>
                  <th>Nombre del Cliente</th>
                  <td>{contract.user.full_name}</td>
                </tr>
                <tr>
                  <th>RUT</th>
                  <td>
                    <code>{contract.user.dni}</code>
                  </td>
                </tr>
                <tr>
                  <th>Teléfono</th>
                  <td>{contract.user.phone}</td>
                </tr>
                <tr>
                  <th>Correo</th>
                  <td>{contract.user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
          <tbody>{contract.entries.length > 0 ? allEntries : noEntry}</tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h3">Nueva Entrada</h3>
      </div>
      <EntryNew
        contract_id={props.match.params.id}
        handlerUpdateContract={handlerUpdateContract}
      />
    </>
  );
}

export default Contract;
