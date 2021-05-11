import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("auth_token");
    // document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    axios.defaults.headers.common["X-User-Token"] = "";
    axios.defaults.headers.common["X-User-Email"] = "";
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  const config = {
    method: "POST",
    headers: {
      // 'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: creds }),
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return fetch("/users/sign_in", config)
      .then((response) =>
        response.json().then((object) => ({ object, response }))
      )
      .then(({ object, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(object || "There was an error while logging in"));
          return Promise.reject(object);
        }

        // in posts create new action and check http status, if malign logout
        // If login was successful, set the token in local storage
        localStorage.setItem("user", JSON.stringify(object.user));
        localStorage.setItem("auth_token", object.user.authentication_token);

        axios.defaults.headers.common["X-User-Token"] =
          object.user.authentication_token;
        axios.defaults.headers.common["X-User-Email"] = object.user.email;

        // Dispatch the success action
        dispatch(receiveLogin(object.user));
        return Promise.resolve(object.user);
      })
      .catch((err) => console.error("Error: ", err));
  };
}
