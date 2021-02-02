import React from "react";
import { render } from "react-dom";
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../assets/stylesheets/dashboard.scss';
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
