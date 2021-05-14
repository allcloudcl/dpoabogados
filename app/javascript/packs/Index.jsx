import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";

import App from "../components/App";
import store from "../store";
import reducers from "../reducers";

// import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
const token = localStorage.getItem("auth_token");
const user = localStorage.getItem("user");

if (token) {
  axios.defaults.headers.common["X-User-Token"] = token;
}

if (user) {
  axios.defaults.headers.common["X-User-Email"] = JSON.parse(user).email;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
