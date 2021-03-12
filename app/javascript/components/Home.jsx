import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="home row align-items-center">
    <div className="p-5 row align-items-center h-50">
      <div className="col-md-6 h-100">
        <h1 className="display-5">
          Software DPO ChileDeudas
          <br />
          al Servicio de sus Clientes
        </h1>
      </div>
      <div className="col-md-6 h-100">
        <p className="lead">
          DPO ChileDeudas mejora el servicio de atención al cliente. Nuestro
          software está diseñado para satisfacer las necesidades de los
          clientes, preparar al Equipo para el éxito y Mantener el Negocio en
          Perfecta Sinfonía.
        </p>
      </div>
    </div>
    <div className="p-5 row text-center h-50">
      <div className="col">
        <Link to="#">
          <div className="card mb-4 shadow-sm h-100">
            <div className="card-body">
              <p className="card-text">
                Bienvenido a ChileDeudas<br />
                Software de Gestión de Empresa
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col">
        <Link to="/about">
          <div className="card mb-4 shadow-sm h-100">
            <div className="card-body">
              <p className="card-text">
                Directorio Empresa
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="col">
        <Link to="/contracts/new">
          <div className="card mb-4 shadow-sm h-100">
            <div className="card-body">
              <p className="card-text">
                Recursos Jurídicos
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
);
